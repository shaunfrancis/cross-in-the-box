import { useEffect, useRef, useState } from "react";

import CanadaFederal2025GeographicMap from "src/components/maps/CanadaFederal2025GeographicMap";
import CanadaFederal2015GeographicMap from "src/components/maps/CanadaFederal2015GeographicMap";
import CanadaFederal2025Map from "src/components/maps/CanadaFederal2025Map";
import CanadaFederal2015Map from "src/components/maps/CanadaFederal2015Map";

import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import HoverPopup from "../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../shared/PopupBarGraph/PopupBarGraph";
import { Party, Region, Result, Update } from "src/Types";
import { DefaultParty, Endpoint } from "src/constants/shared";
import { useRouter } from "next/navigation";
import { constituencyToSlug, regionUrlFun, timeFun } from "src/lib/Canada";
import PartyProgressionBlocs from "src/components/shared/PartyProgressionBlocs/PartyProgressionBlocs";
import { getMessages, parseJSONWithDates, useOnScreen } from "src/lib/shared";
import ElectionSummaryBlocs from "src/components/shared/ElectionSummaries/ElectionSummaryBlocs/ElectionSummaryBlocs";
export default function CanadaElectionResultContainer( 
    { election, live = false, title = [election, "Federal", "Election"], preloadedResults, regions, parties, summaryBlocHoverState, messageGroup, messagesOpenOnLoad, geographic, changes, dedicatedPage, winFormula = (results : Result[]) => results.filter(r => r.elected) } : 
    { 
        election : string, 
        live? : boolean,
        title? : string[],
        preloadedResults? : Result[],
        regions : Region[],
        parties : Party[],
        winFormula? : (results : Result[]) => Result[],
        summaryBlocHoverState? : [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        messageGroup? : string,
        messagesOpenOnLoad?: boolean,
        geographic? : boolean,
        changes? : boolean,
        dedicatedPage? : string
    }
){

    const dimensions = {w:"calc( 1.15 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:"425px", minH:"500px"};
    const router = useRouter();
    const container = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(container);
    const loadingComplete = useRef<boolean>(false);
    
    let [fills, setFills] = useState<{id: string, color: string, opacity?: number}[]>([]);
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], id?: string}>( { visible: false, coordinates:[0,0] } );
    let [results, setResults] = useState<Result[]>([]);
    let [updates, setUpdates] = useState<Update[]>([]);

    let [messages, setMessages] = useState<{id: number, date: Date, node: React.ReactNode}[]>([]);
    let latestMessageDate = useRef<Date>(new Date(0));

    let [livePolling, setLivePolling] = useState<boolean>(false);
    let [liveCounter, setLiveCounter] = useState<number>(0);

    useEffect( () => {
        if( loadingComplete.current || !onScreen || parties.length == 0 || regions.length == 0 || (preloadedResults && preloadedResults.length == 0)) return;
        loadingComplete.current = true;
        
        const getResults = async () => {
            let updateData : Update[] = [];
            if(changes){
                updateData = await fetch(Endpoint + "/updates/canada/" + election)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );
                    
                updateData.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
                setUpdates(updateData);
            }

            let resultData : Result[];
            if(!preloadedResults) resultData = await fetch(Endpoint + '/results/canada/' + election).then( res => res.json() );
            else resultData = preloadedResults;
            setResults(resultData);

            let updatedLiveCount = 0;
            const newFills : {id: string, color: string, opacity?: number}[] = [];
            winFormula(resultData).forEach( result => {
                updatedLiveCount++;
                const regionUpdates = updateData.filter( u => u.id == result.id );
                if(regionUpdates.length > 0){
                    const latestUpdate = regionUpdates[regionUpdates.length - 1];
                    const party : Party = parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                    if(party) newFills.push({ id: latestUpdate.id, color: party.color || "var(--default-color)" });
                }
                else{
                    const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
                    if(party) newFills.push({ 
                        id: result.id, 
                        color: party.color || "var(--default-color)", 
                        opacity: changes ? 0.2 : undefined 
                    });
                }
            });
            setLiveCounter(updatedLiveCount);
            setFills(newFills);

            if(messageGroup){
                const newMessages = await getMessages(parties, latestMessageDate, '/messages/canada/' + messageGroup, regionUrlFun, timeFun);
                setMessages(newMessages);
            }
        };
        getResults();
    }, [onScreen, preloadedResults, parties, regions]);

    if(live) setTimeout( () => {
        setLivePolling(!livePolling); //alternate value to trigger useEffect
    }, 6000);
    useEffect( () => {
        if(!(loadingComplete.current && live)) return;
        const getLiveUpdates = async () => {
            let updatedResultData = await fetch(Endpoint + '/results/canada/' + election + '?compact=true').then( res => res.json() );

            let newResultData : Result[] = [];

            const repeatedPartyMap = new Map<string, number>();
            results.forEach( result => {
                const updatedRows = updatedResultData.filter( d => d.id == result.id && d.p == result.party );
                //handle the case that, for example, there are multiple ind candidates in the same contest
                if(updatedRows.length > 1){
                    let n = repeatedPartyMap.get(JSON.stringify(updatedRows)) || 0;
                    repeatedPartyMap.set(JSON.stringify(updatedRows), n + 1);
                    n = Math.min(n, updatedRows.length - 1);
                    newResultData.push({...result, votes: updatedRows[n].v, elected: updatedRows[n].e});
                }
                else if(updatedRows.length == 1) newResultData.push({...result, votes: updatedRows[0].v, elected: updatedRows[0].e});
                else newResultData.push(result);
            });
            setResults(newResultData);
            
            const newFills : {id: string, color: string, opacity?: number}[] = [];
            let updatedLiveCount = 0;
            winFormula(newResultData).forEach( result => {
                updatedLiveCount++;
                const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
                if(party) newFills.push({ 
                    id: result.id, 
                    color: party.color || "var(--default-color)", 
                    opacity: changes ? 0.2 : undefined 
                });
            });
            setFills(newFills);
            setLiveCounter(updatedLiveCount);

            if(messageGroup){
                const since = new Date(latestMessageDate.current.valueOf());
                since.setHours(since.getHours() - (new Date()).getTimezoneOffset()/60);
                const newMessages = await getMessages(
                    parties,
                    latestMessageDate,
                    '/messages/canada/' + messageGroup + '?since=' + since.toISOString(),
                    regionUrlFun,
                    timeFun,
                    messages
                );

                setMessages(newMessages);
            }
        };
        getLiveUpdates();
    }, [livePolling]);

    const mapHoverFun = (active : boolean = false, event?: React.MouseEvent, id?: string) => {
        const newPopupState = {...popupState, visible: active};
        if(event) newPopupState.coordinates = [event.clientX, event.clientY];
        if(id) newPopupState.id = id;
        setPopupState(newPopupState);
    };

    const mapClickFun = (id: string) => {
        let region = regions.find( r => r.id == id );
        if(region) router.push('riding/' + constituencyToSlug(region.title));
    };
    const map = () => {
        switch(election){
            case "2025":
                if(geographic) return <CanadaFederal2025GeographicMap hoverFun={mapHoverFun} clickFun={mapClickFun} regions={regions} fills={fills} />;
                else return <CanadaFederal2025Map hoverFun={mapHoverFun} clickFun={mapClickFun} regions={regions} fills={fills} />;
            case "2021": case "2019": case "2015":
                if(geographic) return <CanadaFederal2015GeographicMap hoverFun={mapHoverFun} clickFun={mapClickFun} regions={regions} fills={fills} />;
                else return <CanadaFederal2015Map hoverFun={mapHoverFun} clickFun={mapClickFun} regions={regions} fills={fills} />;
        }
    };

    const popupContent = (id? : string) => {
        const region = regions.find( region => region.id == id );
        if(!region) return <h3>Missing data</h3>;
        
        const regionResults = results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        const winner = winFormula(regionResults)[0]?.candidate;

        const regionUpdates = updates.filter( u => u.id == region.id );
        const partyProgression : Party[] = [parties.find(p => p.id == winFormula(regionResults)[0]?.party) || DefaultParty];
        regionUpdates.forEach( update => {
            partyProgression.push( parties.find(p => p.id == update.party) || DefaultParty );
        });

        return ( <>
            <h3>{region.title}</h3>
            {winner && <h4>{winner}</h4>}
            { partyProgression.length > 1 && <PartyProgressionBlocs parties={partyProgression} /> }
            <PopupBarGraph results={regionResults} parties={parties} />
        </> )
    }

    const electionSummaryBlocs = () => {
        const summaries : {party : Party, count : number}[] = [];
        winFormula(results).forEach( result => {
            
            const regionUpdates = updates.filter( u => u.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( s => s.party.id == winner)){
                const party : Party = parties.find( p => p.id == winner ) || DefaultParty;
                summaries.push({ party: party, count: 1 });
            }
            else summaries.find( s => s.party.id == winner )!.count++;

        });
        summaries.sort( (a,b) => {
            const getCount = (x:{party: Party, count: number}) => {
                return (["vacant","speaker","ind"].includes(x.party.id)) ? -Infinity : x.count;
            }
            return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
         } );

        return (
            <ElectionSummaryBlocs data={summaries} rowLength={5} hoverState={summaryBlocHoverState} />
        );
    }

    return ( <>
        <ElectionResultContainer ref={container} 
            dimensions={dimensions} 
            messages={messageGroup ? messages.map(m => m.node) : undefined} messagesOpenOnLoad={messagesOpenOnLoad} 
            map={map()} 
            title={title} 
            liveTitle={live ? [liveCounter.toString(),"of 650","Seats"] : undefined}
            summary={electionSummaryBlocs()}
            dedicatedPage={dedicatedPage}
        >
            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.id)}
            </HoverPopup>
        </ElectionResultContainer>
    </> )
}
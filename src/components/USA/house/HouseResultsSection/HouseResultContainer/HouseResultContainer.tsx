import { useEffect, useRef, useState } from "react";

import ElectionResultContainer from "../../../../shared/ElectionResultContainer/ElectionResultContainer";
import HoverPopup from "../../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../../shared/PopupBarGraph/PopupBarGraph";
import { Party, Region, Result, Update } from "src/Types";
import { DefaultParty, Endpoint } from "src/constants/shared";
import { useRouter } from "next/navigation";
import { constituencyToSlug } from "src/lib/UK";
import { getMessages, getResultsBySubElection, parseJSONWithDates, useOnScreen } from "src/lib/shared";
import ElectionSummaryBar from "src/components/shared/ElectionSummaries/ElectionSummaryBar/ElectionSummaryBar";
import { electionType, subidLabels } from "src/constants/USA";
import USAHouseMap from "src/components/maps/USAHouseMap";
import USAHouseMapGeographic from "src/components/maps/USAHouseMapGeographic";
import LiveCloseAndCountedData from "src/components/USA/shared/LiveCloseAndCountedData/LiveCloseAndCountedData";
import { regionUrlFun, timeFun } from "src/lib/USA";

export default function HouseResultContainer( 
    {
        election,
        live = false,
        title = [election.replace(/[^0-9.]/g, ''), "House", "Elections"],
        preloadedResults,
        regions,
        parties,
        messageGroup,
        messagesOpenOnLoad,
        geographic, 
        changes,
        dedicatedPage,
        winFormula = (results : Result[]) => results.filter(r => r.elected),
        liveCloseAndCountedData = []
    } : 
    { 
        election : string, 
        live? : boolean,
        title? : string[],
        preloadedResults? : Result[],
        regions : Region[],
        parties : Party[],
        winFormula? : (results : Result[]) => Result[],
        messageGroup? : string,
        messagesOpenOnLoad?: boolean,
        geographic? : boolean,
        changes? : boolean,
        dedicatedPage? : string,
        liveCloseAndCountedData? : {id : string, close : Date, counted? : number}[]
    }
){

    const dimensions = {w:"calc( 1.2 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:live ? "525px" : "425px", minH:"500px"};
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
                updateData = await fetch(Endpoint + "/updates/usa/" + election)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );
                    
                updateData.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
                setUpdates(updateData);
            }

            let resultData : Result[];
            if(!preloadedResults) resultData = await fetch(Endpoint + '/results/usa/' + election).then( res => res.json() );
            else resultData = preloadedResults;
            setResults(resultData);

            let updatedLiveCount = 0;
            const newFills : {id: string, color: string, opacity?: number}[] = [];
            winFormula(resultData).forEach( result => {
                // console.log(result);
                // if(result.votes == 0) return;
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
                const newMessages = await getMessages(parties, latestMessageDate, '/messages/usa/' + messageGroup, regionUrlFun, timeFun);
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
            let updatedResultData = await fetch(Endpoint + '/results/usa/' + election + '?compact=true').then( res => res.json() );

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
                    '/messages/usa/' + messageGroup + '?since=' + since.toISOString(),
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
        if(region) router.push('/usa/house-elections/district/' + constituencyToSlug(region.title));
    };
    const map = () => {
        const props = {
            regions: regions,
            hoverFun: mapHoverFun,
            clickFun: mapClickFun,
            fills: fills
        };
        switch(election){
            case "H2024":
                if(geographic) return <USAHouseMapGeographic year="2024" {...props} />;
                else return <USAHouseMap year="2024" {...props} />;
            case "H2022":
                if(geographic) return <USAHouseMapGeographic year="2022" {...props} />;
                else return <USAHouseMap year="2022" {...props} />;
            case "H2020":
                if(geographic) return <USAHouseMapGeographic year="2020" {...props} />;
                else return <USAHouseMap year="2020" {...props} />;
            case "H2018":
                if(geographic) return <USAHouseMapGeographic year="2018" {...props} />;
                else return <USAHouseMap year="2018" {...props} />;
            case "H2016":
                if(geographic) return <USAHouseMapGeographic year="2016" {...props} />;
                else return <USAHouseMap year="2016" {...props} />;
            case "H2014": case "H2012":
                if(geographic) return <USAHouseMapGeographic year="2012" {...props} />;
                else return <USAHouseMap year="2012" {...props} />;
        }
    };

    const popupContent = (id? : string) => {
        const region = regions.find( region => region.id == id );
        if(!region || !id) return <h3>Missing data</h3>;
        
        const regionResults = results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        const winner = winFormula(regionResults)[0]?.candidate;

        const subElections = getResultsBySubElection(regionResults);
        const resultNodes : React.ReactNode[] = [];

        if(id == "2016NC09" && election == "H2018") return ( <>
            <h3>{region.title}</h3>
            <span>This election was annulled due to fraud.</span>
        </> );

        if(electionType(id) == "rounds" && subElections.length >= 1) resultNodes.push(
            <PopupBarGraph 
                key={subElections[0].subid}
                results={subElections[0].results}
                parties={parties}
            />
        );
        else{
            subElections.forEach( subElection => {
                resultNodes.push(
                    <PopupBarGraph 
                        key={subElection.subid} 
                        title={subElections.length > 1 ? subidLabels(id, subElection.subid) : undefined} 
                        results={subElection.results}
                        parties={parties}
                    />
                );
            });
        }
        
        return ( <>
            <h3>{region.title}</h3>
            {winner && <h4>{winner}</h4>}
            {<LiveCloseAndCountedData id={region.id} data={liveCloseAndCountedData} />}
            {resultNodes}
        </> )
    }

    const electionSummaryBar = () => {
        const summaries : {party : Party, count : number}[] = [];
        winFormula(results).forEach( result => {
            
            const regionUpdates = updates.filter( u => u.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( s => s.party.id == result.party)){
                const party : Party = parties.find( p => p.id == winner ) || DefaultParty;
                summaries.push({ party: party, count: 1 });
            }
            else summaries.find( s => s.party.id == winner )!.count++;

        });
        summaries.sort( (a,b) => {
            return b.count - a.count || a.party.id.localeCompare(b.party.id);
        } );

        return (
            <ElectionSummaryBar data={summaries} total={435} />
        );
    }

    return ( <>
        <ElectionResultContainer ref={container} 
            dimensions={dimensions} 
            messages={messageGroup ? messages.map(m => m.node) : undefined} messagesOpenOnLoad={messagesOpenOnLoad} 
            map={map()} 
            title={title} 
            liveTitle={live ? [liveCounter.toString(),"of 435","Seats"] : undefined}
            summary={electionSummaryBar()}
            dedicatedPage={dedicatedPage}
        >
            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.id)}
            </HoverPopup>
        </ElectionResultContainer>
    </> )
}
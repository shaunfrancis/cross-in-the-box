import { useEffect, useRef, useState } from "react";

import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import UKGeneral2010GeographicMap from "src/components/maps/UKGeneral2010GeographicMap";
import UKGeneral2024Map from "src/components/maps/UKGeneral2024Map";
import UKGeneral2024GeographicMap from "src/components/maps/UKGeneral2024GeographicMap";

import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import HoverPopup from "../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../shared/PopupBarGraph/PopupBarGraph";
import ElectionSummaryBlocs from "../../../shared/ElectionSummaryBlocs/ElectionSummaryBlocs";
import { MessageData, Party, Region, Result } from "src/Types";
import { DefaultParty, Endpoint, UKSeatsToWatch } from "src/Constants";
import { useRouter } from "next/navigation";
import { constituencyToSlug } from "src/lib/UK";
import PartyProgressionBlocs from "src/components/shared/PartyProgressionBlocs/PartyProgressionBlocs";
import { dateToLongDate, parseJSONWithDates, useOnScreen } from "src/lib/shared";
import Message from "src/components/shared/Message/Message";

interface Update{
    id : string,
    date : Date,
    party : string
}

export default function UKElectionResultContainer( 
    { election, live = false, title = [election, "General", "Election"], preloadedResults, regions, parties, summaryBlocHoverState, messageGroup, messagesOpenOnLoad, geographic, changes, dedicatedPage, winFormula = (results : Result[]) => results.filter(r => r.elected) } : 
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

    const dimensions = {w:"calc( 0.85 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:live ? "525px" : "425px", minH:"500px"};
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

    const addConstituencyLinks = (text : string) : React.ReactNode[] => {
        const spans : React.ReactNode[] = [];
        text.split("#").forEach( (fragment, index) => {
            if(fragment == "") return;

            const linkedRegion = regions.find( r => r.title.toLowerCase() == fragment.toLowerCase() );

            if(index % 2 && linkedRegion){
                spans.push(
                    <span 
                        key={index}
                        className="interactive"
                        onClick={ () => { router.push('constituency/' + constituencyToSlug(linkedRegion.title)) } }
                    >
                        {fragment}
                    </span> 
                );
            }
            else spans.push( <span key={index}>{fragment}</span> );
        });
        return spans;
    }

    const parseMessage = (message: MessageData, animate?: boolean) => {
        let date : string;
        if(changes) date = dateToLongDate(message.date);
        else date = message.date.getHours().toString().padStart(2,'0') + ":" + message.date.getMinutes().toString().padStart(2,'0');

        //for live messages, if event extends beyond Friday following election day then show day of week
        if(! [4,5].includes(message.date.getDay())){
            const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][message.date.getDay()];
            date = day + ", " + date;
        }
    
        const square = message.square ? (parties.find(p => p.id == message.square) || DefaultParty) : undefined;
        const oldSquare = message.old_square ? (parties.find(p => p.id == message.old_square) || DefaultParty) : undefined;
    
        let messageResults : React.ReactNode[] = [];
        if(message.results) switch(message.result_type){
            case 1: //exit poll                            
                messageResults.push( <PopupBarGraph key={"msg-result"} title={message.link_title} raw={true} goal={326/650} parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} /> );
                break;
            default:
                messageResults.push( <PopupBarGraph key={"msg-result"} title={message.link_title} parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} />);
        }
    
        return ( 
            <Message key={message.id} animate={animate} noHeader={message.no_header} date={date} square={square} oldSquare={oldSquare}>
                {addConstituencyLinks(message.text)}
                {messageResults}
            </Message>
        )
    }

    useEffect( () => {
        if( loadingComplete.current || !onScreen || parties.length == 0 || regions.length == 0 || (preloadedResults && preloadedResults.length == 0)) return;
        loadingComplete.current = true;
        
        const getResults = async () => {
            let updateData : Update[] = [];
            if(changes){
                updateData = await fetch(Endpoint + "/updates/uk/" + election)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );
                    
                updateData.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
                setUpdates(updateData);
            }

            let resultData : Result[];
            if(!preloadedResults) resultData = await fetch(Endpoint + '/results/uk/' + election).then( res => res.json() );
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
                const messagesData : MessageData[] = await fetch(Endpoint + '/messages/uk/' + messageGroup)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );
                //hardcode live message stick to top
                messagesData.sort( (a,b) => { const aId = a.id == 1229 ? 1 : 0; const bId = b.id == 1229 ? 1 : 0; return bId - aId } );

                const newMessages : {id : number, date : Date, node : React.ReactNode}[] = [];
                messagesData.forEach( message => {
                    if(message.date > latestMessageDate.current) latestMessageDate.current = message.date;
                    newMessages.push( {id: message.id, date: message.date, node: parseMessage(message)} );
                });
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
            let updatedResultData = await fetch(Endpoint + '/results/uk/' + election + '?compact=true').then( res => res.json() );

            let newResultData : Result[] = [];

            results.forEach( result => {
                const updatedRow = updatedResultData.find( d => d.id == result.id && d.p == result.party );
                if(updatedRow) newResultData.push({...result, votes: updatedRow.v, elected: updatedRow.e});
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
                const messagesData : MessageData[] = await fetch(Endpoint + '/messages/uk/' + messageGroup + '?since=' + since.toISOString())
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );

                const newMessages : {id : number, date : Date, node : React.ReactNode}[] = [...messages];
                messagesData.forEach( message => {
                    if(message.date > latestMessageDate.current) latestMessageDate.current = message.date;

                    const messageToBeUpdated = newMessages.find(m => m.id == message.id);
                    if(messageToBeUpdated) messageToBeUpdated.node = parseMessage(message);
                    else newMessages.push( {id: message.id, date: message.date, node: parseMessage(message, true)} );
                });
                newMessages.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
                //hardcode live message stick to top
                newMessages.sort( (a,b) => { const aId = a.id == 1229 ? 1 : 0; const bId = b.id == 1229 ? 1 : 0; return bId - aId } );

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
        if(region) router.push('constituency/' + constituencyToSlug(region.title));
    };
    const map = () => {
        switch(election){
            case "2024":
                if(geographic) return <UKGeneral2024GeographicMap hoverFun={mapHoverFun} clickFun={mapClickFun} regions={regions} fills={fills} />;
                else return <UKGeneral2024Map hoverFun={mapHoverFun} clickFun={mapClickFun} regions={regions} fills={fills} />;
            case "2019": case "2017": case "2015": case "2010":
                if(geographic) return <UKGeneral2010GeographicMap hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
                else return <UKGeneral2010Map hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
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


        const watchNote = election == "2024" && UKSeatsToWatch.find(s => s.id == id)?.note;
        
        return ( <>
            <h3>{region.title}</h3>
            {winner && <h4>{winner}</h4>}
            {!winner && <div style={{maxWidth: "350px"}}>{watchNote}</div>}
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
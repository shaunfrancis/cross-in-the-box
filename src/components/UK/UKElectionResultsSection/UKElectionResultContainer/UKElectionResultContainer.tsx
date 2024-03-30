import { useEffect, useState } from "react";
import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import HoverPopup from "../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../shared/PopupBarGraph/PopupBarGraph";
import ElectionSummaryBlocs from "../../../shared/ElectionSummaryBlocs/ElectionSummaryBlocs";
import { MessageData, Party, Region, Result } from "src/Types";
import { DefaultParty, Endpoint } from "src/Constants";
import { useRouter } from "next/navigation";
import { constituencyToSlug, partyIdToDisplayId } from "src/lib/UK";
import UKGeneral2010GeographicMap from "src/components/maps/UKGeneral2010GeographicMap";
import PartyProgressionBlocs from "src/components/shared/PartyProgressionBlocs/PartyProgressionBlocs";
import { parseJSONWithDates } from "src/lib/shared";
import Message from "src/components/shared/Message/Message";

interface Update{
    id : string,
    date : Date,
    party : string
}

export default function UKElectionResultContainer( 
    { election, title = [election, "General", "Election"], parties, summaryBlocHoverState, messageGroup, geographic, changes } : 
    { 
        election : string, 
        title? : string[],
        parties : Party[],
        summaryBlocHoverState? : [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        messageGroup? : string,
        geographic? : boolean,
        changes? : boolean
    }
){

    const dimensions = {w:"calc( 0.85 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:"425px", minH:"500px"};
    let [fills, setFills] = useState<{id: string, color: string, opacity?: number}[]>([]);
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], id?: string}>( { visible: false, coordinates:[0,0] } );
    let [results, setResults] = useState<{regions : Region[], results : Result[]}>({regions:[], results:[]});
    let [updates, setUpdates] = useState<Update[]>([]);
    let [messages, setMessages] = useState<React.ReactNode[]>([]);

    useEffect( () => {
        if(parties.length == 0) return;
        
        const getResults = async () => {
            let updateData : Update[] = [];
            if(changes){
                updateData = await fetch(Endpoint + "/updates/uk/" + election)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );
                    
                updateData.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
                setUpdates(updateData);
            }

            const resultData : {regions : Region[], results : Result[]} = await fetch(Endpoint + '/results/uk/' + election).then( res => res.json() );
            setResults(resultData);

            const newFills : {id: string, color: string, opacity?: number}[] = [];
            resultData.results.filter(r => r.elected).forEach( result => {
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
            setFills(newFills);

            if(messageGroup){
                const messagesData : MessageData[] = await fetch(Endpoint + '/messages/uk/' + messageGroup)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );

                const newMessages : React.ReactNode[] = [];
                messagesData.forEach( (message, index) => {
                    newMessages.push( (
                        <Message key={index}>
                            {message.text}
                            {
                                message.results && 
                                <PopupBarGraph parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} />
                            }
                        </Message>
                    ) );
                });
                setMessages(newMessages);
            }
        };
        getResults();
    }, [parties]);

    const mapHoverFun = (active : boolean = false, event?: React.MouseEvent, id?: string) => {
        const newPopupState = {...popupState, visible: active};
        if(event) newPopupState.coordinates = [event.clientX, event.clientY];
        if(id) newPopupState.id = id;
        setPopupState(newPopupState);
    };

    const router = useRouter();
    const mapClickFun = (id: string) => {
        let region = results.regions.find( r => r.id == id );
        if(region) router.push('general-elections/constituency/' + constituencyToSlug(region.title));
    };
    const map = () => {
        switch(election){
            case "2019": case "2017": case "2015": case "2010":
                if(geographic) return <UKGeneral2010GeographicMap hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
                else return <UKGeneral2010Map hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
        }
    };

    const popupContent = (id? : string) => {
        const region = results.regions.find( region => region.id == id );
        if(!region) return <h3>Missing data</h3>;
        
        const regionResults = results.results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        const winner = regionResults.find(r => r.elected)?.candidate || "Missing data";

        const regionUpdates = updates.filter( u => u.id == region.id );
        const partyProgression : Party[] = [parties.find(p => p.id == regionResults.find(r => r.elected)?.party) || DefaultParty];
        regionUpdates.forEach( update => {
            partyProgression.push( parties.find(p => p.id == update.party) || DefaultParty );
        });
        
        return ( <>
            <h3>{region.title}</h3>
            <h4>{winner}</h4>
            { partyProgression.length > 1 && <PartyProgressionBlocs parties={partyProgression} /> }
            <PopupBarGraph results={regionResults} parties={parties} />
        </> )
    }

    const electionSummaryBlocs = () => {
        const summaries : {party : Party, count : number}[] = [];
        results.results.filter( r => r.elected ).forEach( result => {
            
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
        <ElectionResultContainer dimensions={dimensions} messages={messages} map={map()} title={title} summary={electionSummaryBlocs()}>
            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.id)}
            </HoverPopup>
        </ElectionResultContainer>
    </> )
}
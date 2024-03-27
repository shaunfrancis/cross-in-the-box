import { useEffect, useState } from "react";
import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import HoverPopup from "../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../shared/PopupBarGraph/PopupBarGraph";
import ElectionSummaryBlocs from "../../../shared/ElectionSummaryBlocs/ElectionSummaryBlocs";
import { Party, Region, Result } from "src/Types";
import { DefaultParty, Endpoint } from "src/Constants";
import { useRouter } from "next/navigation";
import { constituencyToSlug, partyIdToDisplayId } from "src/lib/UK";

interface Updates{
    updates : {
        id : string,
        date : Date,
        party : string
    }[],
    parties : Party[]
}

export default function UKElectionChangesContainer( 
    { election, title, summaryBlocHoverState, messages } : 
    { 
        election : string, 
        title : string[],
        summaryBlocHoverState? : [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        messages? : boolean
    }
){

    const dimensions = {w:"calc( 0.85 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:"425px", minH:"500px"};
    let [fills, setFills] = useState<{id: string, color: string, opacity?: number}[]>([]);
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], id?: string}>( { visible: false, coordinates:[0,0] } );
    let [results, setResults] = useState<{regions : Region[], results : Result[], parties : Party[]}>({regions:[], results:[], parties:[]});
    let [updates, setUpdates] = useState<Updates>({updates:[], parties:[]});

    useEffect( () => {
        const getResults = async () => {
            const resultData : {regions : Region[], results : Result[], parties : Party[]} = await fetch(Endpoint + '/results/uk/' + election).then( res => res.json() );
            resultData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });
            setResults(resultData);

            const updateData : Updates = await fetch(Endpoint + "/updates/uk/" + election)
                .then( res => res.text() )
                .then( res => {
                    return JSON.parse( res, (key, value) => {
                        if(key == "date") return new Date(value);
                        return value;
                    });
                });
            updateData.updates.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
            updateData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });
            setUpdates(updateData);


            const newFills : {id: string, color: string, opacity?: number}[] = [];
            resultData.results.filter(r => r.elected).forEach( result => {
                const regionUpdates = updateData.updates.filter( u => u.id == result.id );
                if(regionUpdates.length > 0){
                    const latestUpdate = regionUpdates[0];
                    const party : Party = updateData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                    if(party && party.color) newFills.push({ id: latestUpdate.id, color: party.color });
                }
                else{
                    const party : Party = resultData.parties.find( p => p.id == result.party ) || DefaultParty;
                    if(party && party.color) newFills.push({ id: result.id, color: party.color, opacity: 0.2 });
                }
            });
            setFills(newFills);
        };
        getResults();
    }, []);

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
                return <UKGeneral2010Map hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
        }
    };

    const popupContent = (id? : string) => {
        const region = results.regions.find( region => region.id == id );
        if(!region) return <h3>Missing data</h3>;
        
        const regionResults = results.results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        const parties = results.parties.filter( party => regionResults.map( r => r.party ).includes(party.id) );
        const winner = regionResults.find(r => r.elected)?.candidate || "Missing data";
        
        return ( <>
            <h3>{region.title}</h3>
            <h4>{winner}</h4>
            <PopupBarGraph results={regionResults} parties={parties} />
        </> )
    }

    const electionSummaryBlocs = () => {
        const summaries : {party : Party, count : number}[] = [];
        results.results.filter( r => r.elected ).forEach( result => {
            
            const regionUpdates = updates.updates.filter( u => u.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[0].party : result.party;

            if(!summaries.find( s => s.party.id == winner)){
                const party : Party = [...results.parties,...updates.parties].find( p => p.id == winner ) || DefaultParty;
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
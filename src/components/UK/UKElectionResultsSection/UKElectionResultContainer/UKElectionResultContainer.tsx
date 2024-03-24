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

export default function UKElectionResultContainer( 
    { election, title = {title: election, subtitle: ["General","Election"]}, summaryBlocHoverState, messages } : 
    { 
        election : string, 
        title? : {title : string, subtitle : string[]},
        summaryBlocHoverState? : [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        messages? : boolean
    }
){

    const dimensions = {w:"calc( 0.85 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:"425px", minH:"500px"};
    let [fills, setFills] = useState<{id: string, color: string}[]>([]);
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], id?: string}>( { visible: false, coordinates:[0,0] } );
    let [data, setData] = useState<{regions : Region[], results : Result[], parties : Party[]}>({regions:[], results:[], parties:[]});

    useEffect( () => {
        const getResults = async () => {
            const response = await fetch(Endpoint + '/results/uk/' + election);
            const data : {regions : Region[], results : Result[], parties : Party[]} = await response.json();
            setData(data);

            const newFills : {id: string, color: string}[] = [];
            data.results.filter(r => r.elected).forEach( result => {
                const party : Party = data.parties.find( p => p.id == result.party ) || DefaultParty;
                if(party && party.color) newFills.push({ id: result.id, color: party.color });
            });
            setFills(newFills);

            data.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });
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
        let region = data.regions.find( r => r.id == id );
        if(region) router.push('general-elections/constituency/' + constituencyToSlug(region.title));
    };
    const map = () => {
        switch(election){
            case "2019": case "2017": case "2015": case "2010":
                return <UKGeneral2010Map hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
        }
    };

    const popupContent = (id? : string) => {
        const region = data.regions.find( region => region.id == id );
        if(!region) return <h3>Missing data</h3>;
        
        const results = data.results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        const parties = data.parties.filter( party => results.map( r => r.party ).includes(party.id) );
        const winner = results.find(r => r.elected)?.candidate || "Missing data";
        
        return ( <>
            <h3>{region.title}</h3>
            <h4>{winner}</h4>
            <PopupBarGraph results={results} parties={parties} />
        </> )
    }

    const electionSummaryBlocs = () => {
        const summaries : {party : Party, count : number}[] = [];
        data.results.filter( r => r.elected ).forEach( result => {

            if(!summaries.find( s => s.party.id == result.party)){
                const party : Party = data.parties.find( p => p.id == result.party ) || DefaultParty;
                summaries.push({ party: party, count: 1 });
            }
            else summaries.find( s => s.party.id == result.party )!.count++;

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
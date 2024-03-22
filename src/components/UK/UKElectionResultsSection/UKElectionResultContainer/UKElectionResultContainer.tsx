import { useEffect, useState } from "react";
import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import { Party, Region, Result } from "../../../../types/types";
import { DefaultParty } from "../../../../constants/constants";
import HoverPopup from "../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../shared/PopupBarGraph/PopupBarGraph";
import ElectionSummaryBlocs from "../../../shared/ElectionSummaryBlocs/ElectionSummaryBlocs";

export default function UKElectionResultContainer( 
    { election, title = {title: election, subtitle: ["General","Election"]}, summaryBlocHoverState } : 
    { 
        election : string, 
        title? : {title : string, subtitle : string[]},
        summaryBlocHoverState? : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    }
){

    const dimensions = {w:"calc( 0.85 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:"425px", minH:"500px"};
    let [fills, setFills] = useState<{id: string, color: string}[]>([]);
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], id?: string}>( { visible: false, coordinates:[0,0] } );
    let [data, setData] = useState<{regions : Region[], results : Result[], parties : Party[]}>({regions:[], results:[], parties:[]});

    useEffect( () => {
        const getResults = async () => {
            const response = await fetch('/api/results/uk/' + election);
            const data : {regions : Region[], results : Result[], parties : Party[]} = await response.json();
            setData(data);

            const newFills : {id: string, color: string}[] = [];
            data.results.filter(r => r.elected).forEach( result => {
                const party : Party = data.parties.find( p => p.id == result.party ) || DefaultParty;
                if(party && party.color) newFills.push({ id: result.id, color: party.color });
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
    const map = () => {
        switch(election){
            case "2019": case "2017": case "2015":
                return <UKGeneral2010Map hoverFun={mapHoverFun} fills={fills} />;
        }
    };

    const popupContent = (id? : string) => {
        const region = data.regions.find( region => region.id == id );
        const results = data.results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        const parties = data.parties.filter( party => results.map( r => r.party ).includes(party.id) );

        if(!region) return <h3>Missing data</h3>;
        
        return ( <>
            <h3>{region.title}</h3>
            <PopupBarGraph results={results} parties={parties} />
        </> )
    }

    const electionSummaryBlocs = () => {
        const summaries : {party : string, count : number, color? : string}[] = [];
        data.results.filter( r => r.elected ).forEach( result => {
            if(!summaries.find( s => s.party == result.party)){
                const party : Party = data.parties.find( p => p.id == result.party ) || DefaultParty;
                summaries.push({ party: result.party, count: 1, color: party.color });
            }
            else summaries.find( s => s.party == result.party )!.count++;
        });
        summaries.sort( (a,b) => b.count - a.count );

        return (
            <ElectionSummaryBlocs data={summaries} rowLength={5} hoverState={summaryBlocHoverState} />
        );
    }

    return ( <>
        <ElectionResultContainer dimensions={dimensions} map={map()} title={title} summary={electionSummaryBlocs()}>
            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.id)}
            </HoverPopup>
        </ElectionResultContainer>
    </> )
}
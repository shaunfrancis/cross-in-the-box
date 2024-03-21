import { useEffect, useState } from "react";
import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import { Party, Region, Result } from "../../../../types/types";
import { DefaultParty } from "../../../../constants/constants";
import HoverPopup from "../../../shared/HoverPopup/HoverPopup";

export default function UKElectionResultContainer( { election } : { election: string } ){

    const dimensions = {w:"calc( 0.85 * (100vh - 200px) )", h:"calc(100vh - 200px)", minW:"425px", minH:"500px"};
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

        let totalVotes = 0;
        results.forEach( result => totalVotes += result.votes );

        if(!(region && results)) return <h3>Missing data</h3>;
        return ( id && <>
            <h3>{region.title}</h3>
            {
                results.map( result => {
                    const percentage = 100 * result.votes / totalVotes;
                    return (
                        <div>{result.party} {result.votes} {percentage}%</div>
                    )
                })
            }
        </> )
    }

    return ( <>
        <ElectionResultContainer dimensions={dimensions} map={map()}>
            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.id)}
            </HoverPopup>
        </ElectionResultContainer>
    </> )
}
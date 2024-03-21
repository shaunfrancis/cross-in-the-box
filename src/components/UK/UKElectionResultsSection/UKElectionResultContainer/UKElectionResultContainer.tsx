import { useEffect, useState } from "react";
import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";
import { Party, Region, Result } from "../../../../types/types";
import { DefaultParty } from "../../../../constants/constants";

export default function UKElectionResultContainer( { election } : { election: string } ){

    let [fills, setFills] = useState<{id: string, color: string}[]>([]);
    const dimensions = {w:"calc( 0.85 * (100vh - 200px) )", h:"calc(100vh - 200px)", minW:"425px", minH:"500px"};

    useEffect( () => {

        const getResults = async () => {
            const response = await fetch('/api/results/uk/' + election);
            const data : {regions : Region[], results : Result[], parties : Party[]} = await response.json();

            const newFills : {id: string, color: string}[] = [];
            data.results.filter(r => r.elected).forEach( result => {
                const party : Party = data.parties.find( p => p.id == result.party ) || DefaultParty;
                if(party && party.color) newFills.push({ id: result.id, color: party.color });
            });
            setFills(newFills);

        };
        getResults();

    }, []);

    const showDetails = () => {
        console.log("MOSUEOVER");
    };

    const map = () => {
        switch(election){
            case "2019": case "2017": case "2015":
                return <UKGeneral2010Map hoverFun={showDetails} fills={fills} />;
        }
    };

    return (
        <ElectionResultContainer dimensions={dimensions} map={map()} />
    )
}
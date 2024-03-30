'use client';

import { useEffect, useState } from "react";
import styles from "./UKElectionResultsSection.module.css";
import Toggle from "src/components/shared/Toggle/Toggle";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";
import { Party } from "src/Types";
import { Endpoint } from "src/Constants";
import { partyIdToDisplayId } from "src/lib/UK";

export default function UKElectionResultsSection(){
    const [parties, setParties] = useState<Party[]>([]);
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    const [geographic, setGeographic] = useState<boolean>(false);

    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/uk").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);
        };
        getData();
    }, []);
    
    return ( <>
        <Toggle 
            from={"/images/uk-cartographic-icon.svg"} 
            to={"/images/uk-geographic-icon.svg"} 
            fun={(state) => { setGeographic(state) }}
        />
        <div id={styles["container"]}>
            <UKElectionResultContainer election="2019" title={["Today"]} changes={true} messageGroup="2019U"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                parties={parties}
                geographic={geographic} />
            
            <UKElectionResultContainer election="2019" messageGroup="2019"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                parties={parties}
                geographic={geographic} 
            />

            <UKElectionResultContainer election="2017" messageGroup="2017"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2015"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2010"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                parties={parties}
                geographic={geographic} 
            />
        </div>
    </> )
}
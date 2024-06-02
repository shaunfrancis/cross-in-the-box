'use client';

import { useState } from "react";
import styles from "./UKElectionResultsSection.module.css";
import Toggle from "src/components/shared/Toggle/Toggle";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";
import { Party, Region, Result } from "src/Types";

export default function UKElectionResultsSection({ regions, parties } : { regions : Region[], parties : Party[] }){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    const [geographic, setGeographic] = useState<boolean>(false);
    
    return ( <>
        <Toggle 
            from={"/images/uk-cartographic-icon.svg"} 
            to={"/images/uk-geographic-icon.svg"} 
            fun={(state) => { setGeographic(state) }}
        />
        <div id={styles["container"]}>
            <UKElectionResultContainer election="2024" messageGroup="2024"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2019" title={["Today"]} changes={true} messageGroup="2019U" messagesOpenOnLoad={true}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic} />
            
            <UKElectionResultContainer election="2019" messageGroup="2019"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2017" messageGroup="2017"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2015"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2010"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic} 
            />
        </div>
    </> )
}
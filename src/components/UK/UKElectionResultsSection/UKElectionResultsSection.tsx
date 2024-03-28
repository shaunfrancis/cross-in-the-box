'use client';

import { useState } from "react";
import styles from "./UKElectionResultsSection.module.css";
import UKElectionChangesContainer from "./UKElectionChangesContainer/UKElectionChangesContainer";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";
import Toggle from "src/components/shared/Toggle/Toggle";

export default function UKElectionResultsSection(){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    const [geographic, setGeographic] = useState<boolean>(false);
    
    return ( <>
        <Toggle 
            from={"/images/uk-cartographic-icon.svg"} 
            to={"/images/uk-geographic-icon.svg"} 
            fun={(state) => { setGeographic(state) }}
        />
        <div id={styles["container"]}>
            <UKElectionChangesContainer election="2019" title={["Today"]} summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} geographic={geographic} />
            <UKElectionResultContainer election="2019" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} geographic={geographic} />
            <UKElectionResultContainer election="2017" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} geographic={geographic} />
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} geographic={geographic} />
            <UKElectionResultContainer election="2010" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} geographic={geographic} />
        </div>
    </> )
}
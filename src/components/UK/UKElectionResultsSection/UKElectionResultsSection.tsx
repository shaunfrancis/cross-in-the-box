'use client';

import { useState } from "react";
import styles from "./UKElectionResultsSection.module.css";
import UKElectionChangesContainer from "./UKElectionChangesContainer/UKElectionChangesContainer";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";

export default function UKElectionResultsSection(){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    const [geographic, setGeographic] = useState<boolean>(false);
    
    return ( <>
        <h1>
            Election Results
            <button onClick={() => {setGeographic(!geographic)}}>TOGGLE MAP SETTING</button>
        </h1>
        <div id={styles["container"]}>
            <UKElectionChangesContainer election="2019" title={["Today"]} summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} geographic={geographic} />
            <UKElectionResultContainer election="2019" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} geographic={geographic} />
            <UKElectionResultContainer election="2017" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} geographic={geographic} />
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} geographic={geographic} />
            <UKElectionResultContainer election="2010" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} geographic={geographic} />
        </div>
    </> )
}
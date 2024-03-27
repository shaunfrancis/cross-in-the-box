'use client';

import { useState } from "react";
import styles from "./UKElectionResultsSection.module.css";
import UKElectionChangesContainer from "./UKElectionChangesContainer/UKElectionChangesContainer";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";

export default function UKElectionResultsSection(){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    
    return ( 
        <div id={styles["container"]}>
            <UKElectionChangesContainer election="2019" title={["Today"]} summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} />
            <UKElectionResultContainer election="2019" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} />
            <UKElectionResultContainer election="2017" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} messages={true} />
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} />
            <UKElectionResultContainer election="2010" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} />
        </div>
    )
}
import { useState } from "react";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";
import styles from "./UKElectionResultsSection.module.css";

export default function UKElectionResultsSection(){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    
    return ( 
        <div id={styles["container"]}>
            <UKElectionResultContainer election="2019" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}/>
            <UKElectionResultContainer election="2017" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}/>
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}/>
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}/>
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}/>
            <UKElectionResultContainer election="2015" summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}/>
        </div>
    )
}
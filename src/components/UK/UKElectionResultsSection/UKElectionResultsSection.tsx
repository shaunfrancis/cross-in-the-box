import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";
import styles from "./UKElectionResultsSection.module.css";

export default function UKElectionResultsSection(){
    return ( 
        <div id={styles["container"]}>
            <UKElectionResultContainer election="2019" />
            <UKElectionResultContainer election="2017" />
            <UKElectionResultContainer election="2015" />
            <UKElectionResultContainer election="2015" />
            <UKElectionResultContainer election="2015" />
            <UKElectionResultContainer election="2015" />
            <UKElectionResultContainer election="2015" />
        </div>
    )
}
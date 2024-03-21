import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";

export default function UKElectionResultsSection(){
    return (
        <section>
            <UKElectionResultContainer election="2019" />
            <UKElectionResultContainer election="2017" />
            <UKElectionResultContainer election="2015" />
        </section>
    )
}
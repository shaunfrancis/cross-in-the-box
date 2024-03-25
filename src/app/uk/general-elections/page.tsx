import UKConstituencySearchSection from "src/components/UK/UKConstituencySearchSection/UKConstituencySearchSection";
import UKElectionResultsSection from "../../../components/UK/UKElectionResultsSection/UKElectionResultsSection";

export default function UKGeneralElections(){
    return ( 
        <main>
            <section>
                <h1>Election Results</h1>
                <UKElectionResultsSection />
            </section>
            <section style={{background: "rgb(220,220,245)"}}>
                <h1>Find A Constituency</h1>
                <UKConstituencySearchSection />
            </section>
            <section>
                <h1>Opinion Polls</h1>
            </section>
        </main>
    )
}
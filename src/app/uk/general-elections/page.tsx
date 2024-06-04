"use client";

import UKConstituencySearchSection from "src/components/UK/UKConstituencySearchSection/UKConstituencySearchSection";
import UKElectionResultsSection from "../../../components/UK/UKElectionResultsSection/UKElectionResultsSection";
import UKPollingSection from "src/components/UK/UKPollingSection/UKPollingSection";
import { useEffect, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/Constants";
import { partyIdToDisplayId } from "src/lib/UK";
import UKAnalysisSection from "src/components/UK/UKAnalysisSection/UKAnalysisSection";
import Toggle from "src/components/shared/Toggle/Toggle";

export default function UKGeneralElections(){
    const [regions, setRegions] = useState<Region[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [geographic, setGeographic] = useState<boolean>(false);

    const updateGeographicState = (state : boolean) => {
        setGeographic(state);
        localStorage.setItem("geographic", state ? "1" : "0");
    };

    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/uk").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);

            const regionData : Region[] = await fetch(Endpoint + "/regions/uk").then( res => res.json() );
            setRegions(regionData);
        };
        getData();

        const geographicStoredState = localStorage.getItem("geographic");
        if(geographicStoredState && geographicStoredState == "1") setGeographic(true);
    }, []);
    
    return ( 
        <main>
            <section>
                <div className="section-heading">
                    <h1>Election Results</h1>
                    <Toggle 
                        from={"/images/uk-cartographic-icon.svg"} 
                        to={"/images/uk-geographic-icon.svg"} 
                        fun={(state) => { updateGeographicState(state) }}
                        value={geographic}
                    />
                </div>
                <UKElectionResultsSection regions={regions} parties={parties} geographic={geographic} />
            </section>
            <section className="shaded purple">
                <h1>Find A Constituency</h1>
                <UKConstituencySearchSection />
            </section>
            <section>
                <h1>Opinion Polls</h1>
                <UKPollingSection parties={parties} />
            </section>
            <section>
                <div className="section-heading">
                    <h1>Analysis</h1>
                    <Toggle 
                        from={"/images/uk-cartographic-icon.svg"} 
                        to={"/images/uk-geographic-icon.svg"} 
                        fun={(state) => { updateGeographicState(state) }}
                        value={geographic}
                    />
                </div>
                <UKAnalysisSection regions={regions} parties={parties} geographic={geographic} />
            </section>
        </main>
    )
}
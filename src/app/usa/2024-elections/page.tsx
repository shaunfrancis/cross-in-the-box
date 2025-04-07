"use client";

import { useEffect, useRef, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/constants/shared";
import Toggle from "src/components/shared/Toggle/Toggle";
import HeroNav from "src/components/shared/HeroNav/HeroNav";

import { partyIdToDisplayId } from "src/lib/USA";
import PresidentialSearchSection from "src/components/USA/presidential/PresidentialSearchSection/PresidentialSearchSection";
import PresidentialResultContainer from "src/components/USA/presidential/PresidentialResultsSection/PresidentialResultContainer/PresidentialResultContainer";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import HouseResultContainer from "src/components/USA/house/HouseResultsSection/HouseResultContainer/HouseResultContainer";
import SenateResultContainer from "src/components/USA/senate/SenateResultsSection/SenateResultContainer/SenateResultContainer";
import GovernorResultContainer from "src/components/USA/governor/GovernorResultsSection/GovernorResultContainer/GovernorResultContainer";
import USAMapDefs from "src/components/maps/USAMapDefs";
import { useLiveCloseAndCountedData } from "src/lib/USA-client.tsx";

export default function USAGeneralElections(){
    const [regions, setRegions] = useState<Region[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [geographic, setGeographic] = useState<boolean>(false);

    const liveCloseAndCountedData = useLiveCloseAndCountedData();

    const updateGeographicState = (state : boolean) => {
        setGeographic(state);
        localStorage.setItem("geographic", state ? "1" : "0");
    };

    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/usa").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);

            const regionData : Region[] = await fetch(Endpoint + "/regions/usa").then( res => res.json() );
            setRegions(regionData);
        };
        getData();

        const geographicStoredState = localStorage.getItem("geographic");
        if(geographicStoredState && geographicStoredState == "1") setGeographic(true);
    }, []);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const heroNavItems = [
        { title: "Election Results", src:"/images/usa-nav-results.svg", ref:useRef<HTMLElement>(null) },
        { title: "Find a State", src:"/images/nav-region.svg", ref:useRef<HTMLElement>(null), 
            fun: () => { setTimeout( () => { if(searchInputRef.current) searchInputRef.current.focus() }, 100 ) }
        }
    ]
    
    return ( 
        <main>
            <section id="hero">
                <h1>2024 US Elections</h1>
                <HeroNav items={heroNavItems} />
            </section>

            <section ref={heroNavItems[0].ref}>
                <div className="section-heading">
                    <h1>Election Results</h1>
                    <Toggle 
                        from={"/images/usa-cartographic-presidential-icon.svg"} 
                        to={"/images/usa-geographic-icon.svg"} 
                        fun={(state) => { updateGeographicState(state) }}
                        value={geographic}
                    />
                </div>
                
                <ElectionResultsSection>

                    <PresidentialResultContainer election="P2024" messageGroup="2024" messagesOpenOnLoad={true} live={false}
                        regions={regions}
                        parties={parties}
                        geographic={geographic}
                        liveCloseAndCountedData={liveCloseAndCountedData}
                        title={["President"]}
                    />

                    <SenateResultContainer election="S2024" classNo={1} live={false}
                        regions={regions}
                        parties={parties}
                        geographic={geographic}
                        liveCloseAndCountedData={liveCloseAndCountedData}
                        title={["Senate"]}
                    />

                    <HouseResultContainer election="H2024" live={false}
                        regions={regions}
                        parties={parties}
                        geographic={geographic}
                        liveCloseAndCountedData={liveCloseAndCountedData}
                        title={["House"]}
                    />

                    <GovernorResultContainer election="G2024" live={false}
                        regions={regions}
                        parties={parties}
                        geographic={geographic}
                        liveCloseAndCountedData={liveCloseAndCountedData}
                        title={["Governors"]}
                    />

                </ElectionResultsSection>

            </section>
            <section ref={heroNavItems[1].ref} className="shaded purple">
                <h1>Find a State</h1>
                <PresidentialSearchSection searchInputRef={searchInputRef} />
            </section>
            <USAMapDefs />
        </main>
    )
}
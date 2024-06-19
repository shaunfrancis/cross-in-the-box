"use client";

import UKConstituencySearchSection from "src/components/UK/UKConstituencySearchSection/UKConstituencySearchSection";
import UKElectionResultsSection from "../../../components/UK/UKElectionResultsSection/UKElectionResultsSection";
import UKPollingSection from "src/components/UK/UKPollingSection/UKPollingSection";
import { useEffect, useRef, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/Constants";
import { partyIdToDisplayId } from "src/lib/UK";
import UKAnalysisSection from "src/components/UK/UKAnalysisSection/UKAnalysisSection";
import Toggle from "src/components/shared/Toggle/Toggle";
import UKMapDefs from "src/components/maps/UKMapDefs";
import HeroNav from "src/components/shared/HeroNav/HeroNav";

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

    const searchInputRef = useRef<HTMLInputElement>(null);
    const heroNavItems = [
        { title: "Election Results", src:"/images/uk-nav-results.svg", ref:useRef<HTMLElement>(null) },
        { title: "Find A Constituency", src:"/images/uk-nav-constituency.svg", ref:useRef<HTMLElement>(null), 
            fun: () => { setTimeout( () => { if(searchInputRef.current) searchInputRef.current.focus() }, 100 ) }
        },
        { title: "Opinion Polling", src:"/images/uk-nav-polling.svg", ref:useRef<HTMLElement>(null) }
    ]
    
    return ( 
        <main>
            <section id="hero">
                <h1>UK General Elections</h1>
                <HeroNav items={heroNavItems} />
            </section>

            <section ref={heroNavItems[0].ref}>
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
            <section ref={heroNavItems[1].ref} className="shaded purple">
                <h1>Find A Constituency</h1>
                <UKConstituencySearchSection searchInputRef={searchInputRef} />
            </section>
            <section ref={heroNavItems[2].ref}>
                <h1>
                    <a href="polling" className="heading-link">
                        <span>Opinion Polling</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                    </a>
                </h1>
                <UKPollingSection parties={parties} />
            </section>
            {/*<section ref={heroNavItems[3].ref}>
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
            </section>*/}
            <UKMapDefs />
        </main>
    )
}
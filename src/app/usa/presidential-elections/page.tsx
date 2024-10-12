"use client";

import { useEffect, useRef, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/Constants";
import Toggle from "src/components/shared/Toggle/Toggle";
import HeroNav from "src/components/shared/HeroNav/HeroNav";

import PresidentialResultsSection from "src/components/USA/presidential/PresidentialResultsSection/PresidentialResultsSection";
// import USAConstituencySearchSection from "src/components/USA/USAConstituencySearchSection/USAConstituencySearchSection";
// import USAPollingSection from "src/components/USA/USAPollingSection/USAPollingSection";
// import USAMapDefs from "src/components/maps/USAMapDefs";
import { partyIdToDisplayId } from "src/lib/USA";

export default function USAGeneralElections(){
    const [regions, setRegions] = useState<Region[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [geographic, setGeographic] = useState<boolean>(false);

    const updateGeographicState = (state : boolean) => {
        setGeographic(state);
        localStorage.setItem("geographic", state ? "1" : "0");
    };

    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/usa").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);

            const regionData : Region[] = await fetch(Endpoint + "/regions/usa/presidential").then( res => res.json() );
            setRegions(regionData);
        };
        getData();

        const geographicStoredState = localStorage.getItem("geographic");
        if(geographicStoredState && geographicStoredState == "1") setGeographic(true);
    }, []);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const heroNavItems = [
        { title: "Election Results", src:"/images/usa-nav-results.svg", ref:useRef<HTMLElement>(null) },
        { title: "Find A State", src:"/images/uk-nav-constituency.svg", ref:useRef<HTMLElement>(null), 
            fun: () => { setTimeout( () => { if(searchInputRef.current) searchInputRef.current.focus() }, 100 ) }
        }
    ]
    
    return ( 
        <main>
            <section id="hero">
                <h1>US Presidential Elections</h1>
                <HeroNav items={heroNavItems} />
            </section>

            <section ref={heroNavItems[0].ref}>
                <div className="section-heading">
                    <h1>Election Results</h1>
                    <Toggle 
                        from={"/images/usa-cartographic-icon.svg"} 
                        to={"/images/usa-geographic-icon.svg"} 
                        fun={(state) => { updateGeographicState(state) }}
                        value={geographic}
                    />
                </div>
                <PresidentialResultsSection regions={regions} parties={parties} geographic={geographic} />
            </section>
            <section ref={heroNavItems[1].ref} className="shaded purple">
                <h1>Find A State</h1>
                {/* <USAConstituencySearchSection searchInputRef={searchInputRef} /> */}
            </section>
            {/* <USAMapDefs /> */}
        </main>
    )
}
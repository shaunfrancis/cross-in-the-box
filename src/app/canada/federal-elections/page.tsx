"use client";

import UKConstituencySearchSection from "src/components/UK/UKConstituencySearchSection/UKConstituencySearchSection";
import { useEffect, useRef, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/constants/shared";
import { partyIdToDisplayId } from "src/lib/UK";
import Toggle from "src/components/shared/Toggle/Toggle";
import UKMapDefs from "src/components/maps/UKMapDefs";
import HeroNav from "src/components/shared/HeroNav/HeroNav";
import CanadaElectionResultsSection from "src/components/Canada/CanadaElectionResultsSection/CanadaElectionResultsSection";

export default function CanadaFederalElections(){
    const [regions, setRegions] = useState<Region[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [geographic, setGeographic] = useState<boolean>(false);

    const updateGeographicState = (state : boolean) => {
        setGeographic(state);
        localStorage.setItem("geographic", state ? "1" : "0");
    };

    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/canada").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);

            const regionData : Region[] = await fetch(Endpoint + "/regions/canada").then( res => res.json() );
            setRegions(regionData);
        };
        getData();

        const geographicStoredState = localStorage.getItem("geographic");
        if(geographicStoredState && geographicStoredState == "1") setGeographic(true);
    }, []);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const heroNavItems = [
        { title: "Election Results", src:"/images/usa-nav-results.svg", ref:useRef<HTMLElement>(null) },
        { title: "Find a Riding", src:"/images/nav-region.svg", ref:useRef<HTMLElement>(null), 
            fun: () => { setTimeout( () => { if(searchInputRef.current) searchInputRef.current.focus() }, 100 ) }
        }
    ]
    
    return ( 
        <main>
            <section id="hero">
                <h1>Canadian Federal Elections</h1>
                <HeroNav items={heroNavItems} />
            </section>

            <section ref={heroNavItems[0].ref}>
                <div className="section-heading">
                    <h1>Election Results</h1>
                    <Toggle 
                        from={"/images/usa-cartographic-icon.svg"} 
                        to={"/images/canada-geographic-icon.svg"} 
                        fun={(state) => { updateGeographicState(state) }}
                        value={geographic}
                    />
                </div>
                <CanadaElectionResultsSection regions={regions} parties={parties} geographic={geographic} />
            </section>
            <section ref={heroNavItems[1].ref} className="shaded purple">
                <h1>Find a Riding</h1>
                <UKConstituencySearchSection searchInputRef={searchInputRef} />
            </section>
            <UKMapDefs />
        </main>
    )
}
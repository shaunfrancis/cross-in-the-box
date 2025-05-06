"use client";
import { useEffect, useRef, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/constants/shared";
import { partyIdToDisplayId } from "src/lib/UK";
import HeroNav from "src/components/shared/HeroNav/HeroNav";
import ConclaveResultsSection from "src/components/VaticanCity/ConclaveResultsSection/ConclaveResultsSection";

export default function VaticanPapalConclaves(){
    const [regions, setRegions] = useState<Region[]>([]);
    const [parties, setParties] = useState<Party[]>([]);


    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/vatican").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);

            const regionData : Region[] = await fetch(Endpoint + "/regions/vatican").then( res => res.json() );
            setRegions(regionData);
        };
        getData();
    }, []);

    const heroNavItems = [
        { title: "Election Results", src:"/images/vatican-nav-results.svg", ref:useRef<HTMLElement>(null) }
    ]
    
    return ( 
        <main>
            <section id="hero">
                <h1>Papal Conclaves</h1>
                <HeroNav items={heroNavItems} />
            </section>

            <section ref={heroNavItems[0].ref}>
                {/* <div className="section-heading">
                    <h1>Election Results</h1>
                </div> */}
                <ConclaveResultsSection regions={regions} parties={parties} />
            </section>
        </main>
    )
}
"use client";

import styles from './page.module.css';
import { useEffect, useRef, useState } from "react";
import { Endpoint } from "src/Constants";
import { Party, Poll } from "src/Types";
import HeroNav from "src/components/shared/HeroNav/HeroNav";
import PollGraph from "src/components/shared/PollGraph/PollGraph";
import PollTable from 'src/components/shared/PollTable/PollTable';
import { parsePollData, partyIdToDisplayId } from "src/lib/UK";

export default function UKPolling(){
    const [parties, setParties] = useState<Party[]>([]);
    const [pollData, setPollData] = useState<Poll[]>([]);
    
    useEffect( () => {
        const getPartyData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/uk").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);
        };
        getPartyData();

        parsePollData().then( downloadedPolls => {
            setPollData(downloadedPolls);
        }); 
    }, []);
    
    const heroNavItems = [
        { title: "Graph", src:"/images/nav-polling.svg", ref:useRef<HTMLElement>(null) },
        { title: "Data", src:"/images/nav-region.svg", ref:useRef<HTMLElement>(null) }
    ]
    
    return ( 
        <main>
            <section id="hero">            
                <a href="/uk/general-elections/" className="breadcrumb">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                    <span>UK General Elections</span>
                </a>

                <h1>Opinion Polling</h1>
                <HeroNav items={heroNavItems} />
            </section>
                
            <section ref={heroNavItems[0].ref} className={styles["large-graph-section"]}>
                <PollGraph polls={pollData} parties={parties} />
            </section>

            <section ref={heroNavItems[1].ref} className={styles["large-table-section"]}>
                <PollTable polls={pollData} parties={parties} />
            </section>

        </main>
    )
}
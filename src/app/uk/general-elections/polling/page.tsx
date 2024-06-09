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
        { title: "Graph", src:"/images/uk-nav-polling.svg", ref:useRef<HTMLElement>(null) },
        { title: "Poll Table", src:"/images/uk-nav-constituency.svg", ref:useRef<HTMLElement>(null) }
    ]
    
    return ( 
        <main>
            <section id="hero">
                <h3>&lt; UK General Elections</h3>
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
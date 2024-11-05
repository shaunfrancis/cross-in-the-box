'use client';
import { useEffect, useRef, useState } from "react";
import { DefaultParty, Endpoint } from "src/constants/shared";
import { FullRegionData, ElectionEvent, UpdateEvent, Region } from "src/Types";
import RegionBarGraph from "src/components/shared/RegionBarGraph/RegionBarGraph";
import RegionPage from "src/components/shared/RegionPage/RegionPage";
import { dateToLongDate, orderResults, parseJSONWithDates } from "src/lib/shared";
import Link from 'next/link';
import HeroNav from 'src/components/shared/HeroNav/HeroNav';

import styles from './GovernorStatePage.module.css';
import { constituencyToSlug, partyIdToDisplayId, slugToLookupSlug } from "src/lib/UK";
import GovernorSidebar from "./GovernorSidebar/GovernorSidebar";
import { electionType, subidLabels } from "src/constants/USA";

export default function GovernorStatePage( { slug } : { slug : string } ){

    let prettySlug = "";
    slug.replace(/-/g, " ").split(" ").forEach( slugPiece => {
        prettySlug += slugPiece.charAt(0).toUpperCase() + slugPiece.slice(1) + " ";
    });
    let [region, setRegion] = useState<{id? : string, title : string}>({ title: prettySlug });
    let [data, setData] = useState<FullRegionData>({ events: [], parties: [], tree: [] });

    useEffect( () => {
        const useAsyncEffect = async () => {
            const regionData = await fetch(Endpoint + "/slug-lookup/usa/" + slugToLookupSlug(slug) + "/governor").then( res => res.json() );
            if(regionData.error){
                //error handling
            }

            const resultData : FullRegionData = await fetch(Endpoint + "/region/usa/" + regionData.id)
                .then( res => res.text() )
                .then( text => parseJSONWithDates(text, "date") );
                
            resultData.events.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
            resultData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });

            if(resultData.events.length > 0) setRegion(resultData.events[0].region);
            setData(resultData);

        };
        useAsyncEffect();
    }, []);

    

    const eventNodes : React.ReactNode[] = [];
    const succeededByNodes : React.ReactNode[] = [];

    let currentRegion : Region;
    data.events.forEach( (event, index) => {
        if(index == 0){
            if(data.tree.find(t => t.region_id == event.region.id && !t.direct_successor)){
                data.tree.filter(t => t.region_id == event.region.id && !t.direct_successor).forEach( treeBranch => {
                    succeededByNodes.push(
                        <Link href={'/usa/gubernatorial-elections/state/' + constituencyToSlug(treeBranch.title)} className={styles["abolished-link"] + " unstyled"}>
                            <h3>{treeBranch.title}</h3>
                        </Link>
                    )
                });
            }
        }


        if(!currentRegion){ //first event, show title and set region
            currentRegion = event.region;
        }

        else if(event.region.id != currentRegion.id){ //find note explaining change from tree
            const treeLink = data.tree.find(t => t.region_id == event.region.id && t.successor_id == currentRegion.id);
            if(treeLink){
                let note = "";
                if(event.region.title != currentRegion.title) note += "The constituency was renamed to " + currentRegion.title + ".";
                else note += "Boundary changes occurred.";
                eventNodes.push(
                    <article key={"boundary-note-" + index} className={styles["boundary-change-note"]}>{note} {treeLink.note}</article>
                );
            }
            else{
                eventNodes.push(
                    <article key={"boundary-note-" + index} className={styles["boundary-change-note"]}>Boundary changes.</article>
                );
            }

            if(event.region.title != currentRegion.title) eventNodes.push( <h1>{event.region.title}</h1> );
            currentRegion = event.region;
        }

        switch(event.type){
            case "election": {
                let castEvent = event as ElectionEvent;
                castEvent.data.results.sort(orderResults);
                const subElectionType = electionType(castEvent.region.id);
                eventNodes.push(
                    <RegionBarGraph key={index} title={castEvent.data.title} subtitles={subidLabels(castEvent.region.id)} results={castEvent.data.results} parties={data.parties}
                    subElectionType={subElectionType} />
                );
                break;
            }
            case "update": {
                let castEvent = event as UpdateEvent;
                const party = data.parties.find( p => p.id == castEvent.data.party ) || DefaultParty;
                eventNodes.push(
                    <article className={styles["update-note"]} key={index}>

                        <div className={styles["party-bloc"]} style={{background:party.color, color:party.textColor}}>
                            {party.displayId}
                        </div>
                        <h2>{dateToLongDate(castEvent.date)}</h2>
                        <span>{castEvent.data.note}</span>

                    </article>
                );
                break;
            }
        }
    });

    const heroNavItems = [
        { title: "Results", src:"/images/nav-region.svg", ref:useRef<HTMLElement>(null) }
    ]

    return ( <>

        <section id="hero">
            <a href="/usa/gubernatorial-elections/" className="breadcrumb">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                <span>US Gubernatorial Elections</span>
            </a>

            <h1>{region.title}</h1>
            <HeroNav items={heroNavItems} />
        </section>
        <RegionPage sidebar={<GovernorSidebar region={region} />}>

            {succeededByNodes.length > 0 &&
                <section id={styles["abolished-container"]} className="shaded yellow">
                    <h2>This constituency was abolished following a boundary review. It was succeeded by:</h2>
                    <div id={styles["abolished-links-container"]}>
                        {succeededByNodes}
                    </div>
                </section>
            }

            <section ref={heroNavItems[0].ref}>
                {eventNodes}
            </section>
            
        </RegionPage>
    </> )
}
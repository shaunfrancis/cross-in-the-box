'use client';
import styles from './UKConstituencyPage.module.css';
import { useEffect, useState } from "react";
import { DefaultParty, Endpoint } from "src/Constants";
import { AnonymousResult, Party, Region } from "src/Types";
import RegionBarGraph from "src/components/shared/RegionBarGraph/RegionBarGraph";
import RegionPage from "src/components/shared/RegionPage/RegionPage";
import { partyIdToDisplayId, slugToLookupSlug } from "src/lib/UK";
import { dateToLongDate, parseJSONWithDates } from "src/lib/shared";
import UKConstituencySidebar from "./UKConstituencySidebar/UKConstituencySidebar";
import UKTernaryPlot from '../UKAnalysisSection/UKTernaryPlot/UKTernaryPlot';

interface FullRegionData{
    events : Event[],
    parties : Party[],
    tree : {
        region_id: string,
        successor_id: string,
        direct_successor: boolean,
        note?: string
    }[]
}

interface Event{
    type : string,
    date : Date,
    region : Region
}

interface ElectionEvent extends Event{
    data : { 
        id : string,
        title : string[],
        results : AnonymousResult[] 
    }
}

interface UpdateEvent extends Event{
    data: {
        party: string,
        note: string
    }
}

export default function UKConstituencyPage( { slug } : { slug : string } ){

    let prettySlug = "";
    slug.replace(/-/g, " ").split(" ").forEach( slugPiece => {
        if(["and","upon","on","under","h","an"].includes(slugPiece)) prettySlug += slugPiece + " ";
        else prettySlug += slugPiece.charAt(0).toUpperCase() + slugPiece.slice(1) + " ";
    });
    let [region, setRegion] = useState<{id? : string, title : string}>({ title: prettySlug });
    let [data, setData] = useState<FullRegionData>({ events: [], parties: [], tree: [] });

    useEffect( () => {
        const useAsyncEffect = async () => {
            const regionData = await fetch(Endpoint + "/slug-lookup/uk/" + slugToLookupSlug(slug)).then( res => res.json() );
            if(regionData.error){
                //error handling
            }
            setRegion(regionData);

            const resultData : FullRegionData = await fetch(Endpoint + "/region/uk/" + regionData.id)
                .then( res => res.text() )
                .then( text => parseJSONWithDates(text, "date") );
                
            resultData.events.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
            resultData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });
            setData(resultData);

        };
        useAsyncEffect();
    }, []);

    const eventNodes : React.ReactNode[] = [];
    let currentRegion : Region;
    data.events.forEach( (event, index) => {

        if(!currentRegion){ //first event, show title and set region
            currentRegion = event.region;
        }

        else if(event.region.id != currentRegion.id){ //find note explaining change from tree
            const treeLink = data.tree.find(t => t.region_id == event.region.id && t.successor_id == currentRegion.id);
            if(treeLink){
                let note = "";
                if(event.region.title != currentRegion.title) note += "The constituency was renamed to " + currentRegion.title + ".";
                eventNodes.push(
                    <section key={"boundary-note-" + index} className={styles["boundary-change-note"]}>{note} {treeLink.note}</section>
                );
            }
            else{
                eventNodes.push(
                    <section key={"boundary-note-" + index} className={styles["boundary-change-note"]}>Boundary changes.</section>
                );
            }

            if(event.region.title != currentRegion.title) eventNodes.push( <h1>{event.region.title}</h1> );
            currentRegion = event.region;
        }

        switch(event.type){
            case "election": {
                let castEvent = event as ElectionEvent;
                castEvent.data.results.sort( (a,b) => b.votes - a.votes );
                eventNodes.push(
                    <RegionBarGraph key={index} title={castEvent.data.title} results={castEvent.data.results} parties={data.parties} />
                );
                break;
            }
            case "update": {
                let castEvent = event as UpdateEvent;
                const party = data.parties.find( p => p.id == castEvent.data.party ) || DefaultParty;
                eventNodes.push(
                    <section className={styles["update-note"]} key={index}>

                        <div className={styles["party-bloc"]} style={{background:party.color, color:party.textColor}}>
                            {party.displayId}
                        </div>
                        <h2>{dateToLongDate(castEvent.date)}</h2>
                        <p>{castEvent.data.note}</p>

                    </section>
                );
                break;
            }
        }
    });


    return ( <>
        <RegionPage sidebar={<UKConstituencySidebar region={region} />}>
            <h1>{region.title}</h1>
            <UKTernaryPlot highlightChanges={false} parties={data.parties} resultSets={
                ( () => { 
                    const sets : AnonymousResult[][] = [];
                    data.events.forEach( event => {
                        if(event.type == "election") sets.push((event as ElectionEvent).data.results);
                    }) 
                    return sets.reverse();
                } )()
            } />
            {eventNodes}
        </RegionPage>
    </> )
}
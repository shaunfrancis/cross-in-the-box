'use client';
import styles from './UKConstituencyPage.module.css';
import { useEffect, useState } from "react";
import { Endpoint } from "src/Constants";
import { AnonymousResult, Party, Region } from "src/Types";
import RegionBarGraph from "src/components/shared/RegionBarGraph/RegionBarGraph";
import RegionPage from "src/components/shared/RegionPage/RegionPage";
import { partyIdToDisplayId, slugToLookupSlug } from "src/lib/UK";
import { parseJSONWithDates } from "src/lib/shared";
import UKConstituencySidebar from "./UKConstituencySidebar/UKConstituencySidebar";

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
    region : Region,
    data : { 
        id : string,
        title : string[],
        results : AnonymousResult[] 
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
            eventNodes.push( <h1>{event.region.title}</h1> );
            currentRegion = event.region;
        }

        else if(event.region.id != currentRegion.id){ //find note explaining change from tree
            const treeLink = data.tree.find(t => t.region_id == event.region.id && t.successor_id == currentRegion.id);
            if(treeLink){
                let note = "";
                if(event.region.title != currentRegion.title) note += "The constituency was renamed to " + currentRegion.title + ".";
                eventNodes.push(
                    <p className={styles["boundary-change-note"]}>{note} {treeLink.note}</p>
                );
            }
            else{
                eventNodes.push(
                    <p className={styles["boundary-change-note"]}>Boundary changes.</p>
                );
            }

            if(event.region.title != currentRegion.title) eventNodes.push( <h1>{event.region.title}</h1> );
            currentRegion = event.region;
        }

        switch(event.type){
            case "election":
                event.data.results.sort( (a,b) => b.votes - a.votes );
                eventNodes.push(
                    <RegionBarGraph key={index} title={event.data.title} results={event.data.results} parties={data.parties} />
                );
                break;
        }
    });


    return ( <>
        <RegionPage sidebar={<UKConstituencySidebar region={region} />}>
            {eventNodes}
        </RegionPage>
    </> )
}
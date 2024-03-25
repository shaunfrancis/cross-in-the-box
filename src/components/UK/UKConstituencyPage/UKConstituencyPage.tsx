'use client';
import { useEffect, useState } from "react";
import { Endpoint } from "src/Constants";
import { AnonymousResult, Party } from "src/Types";
import RegionBarGraph from "src/components/shared/RegionBarGraph/RegionBarGraph";
import RegionPage from "src/components/shared/RegionPage/RegionPage";
import { partyIdToDisplayId, slugToLookupSlug } from "src/lib/UK";

interface Event{
    type : string,
    date : Date,
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

    let [data, setData] = useState< {events : Event[], parties : Party[]}>({ events: [], parties: [] });

    useEffect( () => {
        const useAsyncEffect = async () => {
            const regionData = await fetch(Endpoint + "/slug-lookup/uk/" + slugToLookupSlug(slug)).then( res => res.json() );
            if(regionData.error){
                //error handling
            }
            setRegion(regionData);

            const resultData : {events : Event[], parties : Party[]} = await fetch(Endpoint + "/region/uk/" + regionData.id)
                .then( res => res.text() )
                .then( text => {
                    return JSON.parse(text, (key, value) => {
                        if(key == "date") return new Date(value);
                        return value;
                    });
                });
            resultData.events.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
            resultData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });
            setData(resultData);
        };
        useAsyncEffect();
    }, []);

    const eventNodes : React.ReactNode[] = [];
    let index = 0;
    data.events.forEach( event => {
        switch(event.type){
            case "election":
                event.data.results.sort( (a,b) => b.votes - a.votes );
                eventNodes.push(
                    <RegionBarGraph key={index} title={event.data.title} results={event.data.results} parties={data.parties} />
                );
                break;
        }
        index++;
    });


    return ( <>
        <RegionPage>
            <h1>{region.title}</h1>
            {eventNodes}
        </RegionPage>
    </> )
}
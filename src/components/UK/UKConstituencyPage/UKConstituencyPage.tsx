'use client';
import { useEffect, useState } from "react";
import { Endpoint } from "src/Constants";
import { slugToLookupSlug } from "src/lib/UK";

export default function UKConstituencyPage( { slug } : { slug : string } ){

    let prettySlug = "";
    slug.replace(/-/g, " ").split(" ").forEach( slugPiece => {
        if(["and","upon","on","under","h","an"].includes(slugPiece)) prettySlug += slugPiece + " ";
        else prettySlug += slugPiece.charAt(0).toUpperCase() + slugPiece.slice(1) + " ";
    });
    let [region, setRegion] = useState<{id? : string, title : string}>({ title: prettySlug });

    let [results, setResults] = useState<any>();

    useEffect( () => {
        const useAsyncEffect = async () => {
            const regionData = await fetch(Endpoint + "/slug-lookup/uk/" + slugToLookupSlug(slug)).then((res) => res.json());
            if(regionData.error){
                //error handling
            }
            setRegion(regionData);

            const resultData = await fetch(Endpoint + "/region/uk/" + regionData.id).then((res) => res.json());
            setResults(resultData);
        };
        useAsyncEffect();
    }, []);

    return ( <>
        <h1>{region.title}</h1>
        <p>{JSON.stringify(results)}</p>
    </> )
}
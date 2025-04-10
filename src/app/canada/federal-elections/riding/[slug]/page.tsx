import { Endpoint } from "src/constants/shared"
import { constituencyToSlug, slugToLookupSlug } from "src/lib/Canada";

import { Metadata } from 'next';
import CanadaRidingPage from "src/components/Canada/CanadaRidingPage/CanadaRidingPage";
 
export async function generateMetadata( { params } : { params: {slug : string} } ) : Promise<Metadata> {
    const regionData = await fetch(Endpoint + "/slug-lookup/canada/" + slugToLookupSlug(params.slug)).then( res => res.json() );
    return {
      title: regionData.title
    }
  }

export default function Constituency( { params } : { params: {slug : string} } ){

    return(
        <CanadaRidingPage slug={params.slug} />
    )
}

export async function generateStaticParams(){
    const regions : {id : string, title : string}[] = await fetch(Endpoint + "/regions/canada", { cache: 'no-store' }).then((res) => res.json());

    return regions.map( region => {
        return { slug: constituencyToSlug(region.title) }
    });
}
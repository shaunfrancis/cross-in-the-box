import { Endpoint } from "src/Constants"
import UKConstituencyPage from "src/components/UK/UKConstituencyPage/UKConstituencyPage";
import { constituencyToSlug, slugToLookupSlug } from "src/lib/UK";

import { Metadata } from 'next';
 
export async function generateMetadata( { params } : { params: {slug : string} } ) : Promise<Metadata> {
    const regionData = await fetch(Endpoint + "/slug-lookup/uk/" + slugToLookupSlug(params.slug)).then( res => res.json() );
    return {
      title: regionData.title
    }
  }

export default function Constituency( { params } : { params: {slug : string} } ){

    return(
        <UKConstituencyPage slug={params.slug} />
    )
}

export async function generateStaticParams(){
    const regions : {id : string, title : string}[] = await fetch(Endpoint + "/regions/uk").then((res) => res.json());

    return regions.map( region => {
        return { slug: constituencyToSlug(region.title) }
    });
}
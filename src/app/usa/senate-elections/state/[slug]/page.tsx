import { Endpoint } from "src/constants/shared"
import { Metadata } from 'next';

import { stateToSlug, slugToLookupSlug } from "src/lib/USA";
import SenateStatePage from "src/components/USA/senate/SenateStatePage/SenateStatePage";
 
export async function generateMetadata( { params } : { params: {slug : string} } ) : Promise<Metadata> {
    const regionData = await fetch(Endpoint + "/slug-lookup/usa/" + slugToLookupSlug(params.slug)).then( res => res.json() );
    return {
      title: regionData.title
    }
  }

export default function Constituency( { params } : { params: {slug : string} } ){

    return(
        <SenateStatePage slug={params.slug} />
    )
}

export async function generateStaticParams(){
    const regions : {id : string, title : string}[] = await fetch(Endpoint + "/regions/usa/senate", { cache: 'no-store' }).then((res) => res.json());

    return regions.map( region => {
        return { slug: stateToSlug(region.title) }
    });
}
import { Endpoint } from "src/Constants"
import UKConstituencyPage from "src/components/UK/UKConstituencyPage/UKConstituencyPage";
import { constituencyToSlug } from "src/lib/UK";

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
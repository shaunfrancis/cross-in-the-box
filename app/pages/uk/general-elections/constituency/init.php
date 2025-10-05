<?php
$_dynamic_params_accepted = 1;

$slugToLookupSlug = function(string $slug){
    if($slug == "ynys-mon") return "ynys-môn";
    return $slug;
};
$slug = $slugToLookupSlug($_params['path'][0]);

// $prettySlug = "";
// foreach(explode(" ", preg_replace('/-/', " ", $slug)) as $slugPiece){
//     if(in_array($slugPiece, ["and","upon","on","under","h","an"])) $prettySlug .= $slugPiece . " ";
//     else $prettySlug .= ucfirst($slugPiece) . " ";
// }
// echo $prettySlug;

$region = API\SlugLookupService::call(["uk", $slug]);
if(empty($region) || !empty($region['error'])){
    //need 404 handling
    exit;
}

$_title[] = $region['title'];

/*
    useEffect( () => {
        const useAsyncEffect = async () => {
            const resultData : FullRegionData = await fetch(Endpoint + "/region/uk/" + regionData.id)
                .then( res => res.text() )
                .then( text => parseJSONWithDates(text, "date") );
                
            resultData.events.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
            resultData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });

            if(resultData.events.length > 0) setRegion(resultData.events[0].region);
            setData(resultData);

        };
        useAsyncEffect();
    }, []);
*/
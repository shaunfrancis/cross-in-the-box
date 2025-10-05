<?php
$_dynamic_params_accepted = 1;

$slugToLookupSlug = function(string $slug){
    if($slug == "ynys-mon") return "ynys-môn";
    return $slug;
};

if(empty($_params['path'][0])){
    $region = ['title' => "Constituency not found"];
    throw new Exception(404);
}

$slug = $slugToLookupSlug($_params['path'][0]);
$region = API\SlugLookupService::call(["uk", $slug]);

if(empty($region) || !empty($region['error'])){
    $region['title'] = "Constituency not found";
    throw new Exception(404);
}

$results = API\RegionService::call(["uk", $region['id']]);

usort($results['events'], function($a, $b){
    return DateTime::createFromFormat('Y-m-d H:i:s', $a['date']) < DateTime::createFromFormat('Y-m-d H:i:s', $b['date']); 
});

// check if constituency was renamed (but not replaced);
// if so, simulate redirect with canonical link and history.replaceState injection,
// but no need to actually redirect since data already download and is equivalent
if(!empty($results['events'][0]['region']['title']) && $results['events'][0]['region']['title'] != $region['title']){
    $region['title'] = $results['events'][0]['region']['title'];
    $region['id'] = $results['events'][0]['region']['id'];

    $newSlug = preg_replace(
        '/,|\)|\(/', "", preg_replace(
            '/ô/', "o", preg_replace(
                '/ /', "-", strtolower($region['title'])
            )
        )
    );
    $_headInjections[] = sprintf('<link rel="canonical" href="https://crossinthebox.com/uk/general-elections/constituency/%s" />', $newSlug);
    $_headInjections[] = sprintf('<script>history.replaceState(null,"","%s");</script>', $newSlug);
}

$_title[] = $region['title'];

/*
    const resultData : FullRegionData = await fetch(Endpoint + "/region/uk/" + regionData.id)
        .then( res => res.text() )
        .then( text => parseJSONWithDates(text, "date") );
        
    resultData.events.sort( (a,b) => b.date.valueOf() - a.date.valueOf() );
    resultData.parties.forEach( party => { party.displayId = partyIdToDisplayId(party.id) });
*/
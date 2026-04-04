<?php
include_once './app/lib/usa.php';
$_dynamic_params_accepted = 1;

if(empty($_params['path'][0])){
    $region = ['title' => "District not found"];
    throw new Exception(404);
}

$slug = USA\slugToLookupSlug($_params['path'][0]);
$region = API\SlugLookupService::call(["usa", $slug, "house"]);

if(empty($region) || !empty($region['error'])){
    $region['title'] = "District not found";
    throw new Exception(404);
}

$data = API\RegionService::call(["usa", $region['id']]);

usort($data['events'], function($a, $b){
    return DateTime::createFromFormat('Y-m-d H:i:s', $a['date']) < DateTime::createFromFormat('Y-m-d H:i:s', $b['date']) ? 1 : -1;
});

// check if constituency was renamed (but not replaced);
// if so, simulate redirect with canonical link and history.replaceState injection,
// but no need to actually redirect since data already download and is equivalent
if(!empty($data['events'][0]['region']['title']) && $data['events'][0]['region']['title'] != $region['title']){
    $region['title'] = $data['events'][0]['region']['title'];
    $region['id'] = $data['events'][0]['region']['id'];

    $newSlug = USA\regionToSlug($region['title']);
    $_headInjections[] = sprintf('<link rel="canonical" href="https://crossinthebox.com/usa/house-elections/district/%s" />', $newSlug);
    $_headInjections[] = sprintf('<script>history.replaceState(null,"","%s");</script>', $newSlug);
}

$_title[] = $region['title'];
$_description[] = "Browse House of Representatives election results and data for the {$region['title']} district.";
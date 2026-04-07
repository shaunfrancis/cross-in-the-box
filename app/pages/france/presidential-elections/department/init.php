<?php
include_once './app/lib/france.php';
$_dynamic_params_accepted = 1;

if(empty($_params['path'][0])){
    $region = ['title' => "Department not found"];
    throw new Exception(404);
}

$slug = France\slugToLookupSlug($_params['path'][0]);
$region = API\SlugLookupService::call(["france", $slug]);

if(empty($region) || !empty($region['error'])){
    $region['title'] = "Department not found";
    throw new Exception(404);
}

$data = API\RegionService::call(["france", $region['id']]);

usort($data['events'], function($a, $b){
    return DateTime::createFromFormat('Y-m-d H:i:s', $a['date']) < DateTime::createFromFormat('Y-m-d H:i:s', $b['date']) ? 1 : -1;
});

// check if department was renamed (but not replaced);
// if so, simulate redirect with canonical link and history.replaceState injection,
// but no need to actually redirect since data already download and is equivalent
if(!empty($data['events'][0]['region']['title']) && $data['events'][0]['region']['title'] != $region['title']){
    $region['title'] = $data['events'][0]['region']['title'];
    $region['id'] = $data['events'][0]['region']['id'];

    $newSlug = France\regionToSlug($region['title']);
    $_headInjections[] = sprintf('<link rel="canonical" href="https://crossinthebox.com/france/presidential-elections/department/%s" />', $newSlug);
    $_headInjections[] = sprintf('<script>history.replaceState(null,"","%s");</script>', $newSlug);
}

$_title[] = $region['title'];
$_description[] = "Browse presidential election results and data for {$region['title']}.";
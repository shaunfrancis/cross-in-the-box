<?php
include_once './app/lib/hungary.php';
$_dynamic_params_accepted = 1;

if(empty($_params['path'][0])){
    $region = ['title' => "Constituency not found"];
    throw new Exception(404);
}

$slug = Hungary\slugToLookupSlug($_params['path'][0]);
$region = API\SlugLookupService::call(["hungary", $slug]);

if(empty($region) || !empty($region['error'])){
    $region['title'] = "Constituency not found";
    throw new Exception(404);
}

$live_events = API\LiveEventsService::call(["hungary"]);
if(empty($live_events['error']) && count($live_events) > 0) $regionParams = ['live' => TRUE];
$data = API\RegionService::call(["hungary", $region['id']], $regionParams ?? []);

usort($data['events'], function($a, $b){
    return DateTime::createFromFormat('Y-m-d H:i:s', $a['date']) < DateTime::createFromFormat('Y-m-d H:i:s', $b['date']) ? 1 : -1;
});

// check if constituency was renamed (but not replaced);
// if so, simulate redirect with canonical link and history.replaceState injection,
// but no need to actually redirect since data already download and is equivalent
if(!empty($data['events'][0]['region']['title']) && $data['events'][0]['region']['title'] != $region['title']){
    $region['title'] = $data['events'][0]['region']['title'];
    $region['id'] = $data['events'][0]['region']['id'];

    $newSlug = Hungary\regionToSlug($region['title']);
    $_headInjections[] = sprintf('<link rel="canonical" href="https://crossinthebox.com/hungary/parliamentary-elections/constituency/%s" />', $newSlug);
    $_headInjections[] = sprintf('<script>history.replaceState(null,"","%s");</script>', $newSlug);
}

$_title[] = $region['title'];
if($region['id'] === "2014List") $_description[] = "Browse party list vote data for Hungarian parliamentary elections.";
else $_description[] = "Browse parliamentary election results and data for the {$region['title']} constituency.";
$_breadcrumb = ['title' => $region['title'], 'path' => 'hungary/parliamentary-elections/constituency/' . Hungary\regionToSlug($region['title'])];
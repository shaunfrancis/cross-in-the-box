<?php
include_once './app/lib/new-zealand.php';
$_dynamic_params_accepted = 1;

if(empty($_params['path'][0])){
    $region = ['title' => "Electorate not found"];
    throw new Exception(404);
}

$slug = NewZealand\slugToLookupSlug($_params['path'][0]);
$region = API\SlugLookupService::call(["nz", $slug]);

if(empty($region) || !empty($region['error'])){
    $region['title'] = "Electorate not found";
    throw new Exception(404);
}

$live_events = API\LiveEventsService::call(["nz"]);
if(empty($live_events['error']) && count($live_events) > 0) $regionParams = ['live' => TRUE];
$data = API\RegionService::call(["nz", $region['id']], $regionParams ?? []);

usort($data['events'], function($a, $b){
    return DateTime::createFromFormat('Y-m-d H:i:s', $a['date']) < DateTime::createFromFormat('Y-m-d H:i:s', $b['date']) ? 1 : -1;
});

// check if electorate was renamed (but not replaced);
// if so, simulate redirect with canonical link and history.replaceState injection,
// but no need to actually redirect since data already download and is equivalent
if(!empty($data['events'][0]['region']['title']) && $data['events'][0]['region']['title'] != $region['title']){
    $region['title'] = $data['events'][0]['region']['title'];
    $region['id'] = $data['events'][0]['region']['id'];

    $newSlug = NewZealand\regionToSlug($region['title']);
    $_headInjections[] = sprintf('<link rel="canonical" href="https://crossinthebox.com/new-zealand/general-elections/electorate/%s" />', $newSlug);
    $_headInjections[] = sprintf('<script>history.replaceState(null,"","%s");</script>', $newSlug);
}

$_title[] = $region['title'];
$_description[] = "Browse general election results and data for the {$region['title']} electorate.";
$_breadcrumb = ['title' => $region['title'], 'path' => 'new-zealand/general-elections/electorate/' . NewZealand\regionToSlug($region['title'])];
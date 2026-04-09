<?php
include_once './app/lib/usa.php';
$_dynamic_params_accepted = 1;

if(empty($_params['path'][0])){
    $region = ['title' => "State not found"];
    throw new Exception(404);
}

$slug = USA\slugToLookupSlug($_params['path'][0]);
$region = API\SlugLookupService::call(["usa", $slug, "senate"]);

if(empty($region) || !empty($region['error'])){
    $region['title'] = "State not found";
    throw new Exception(404);
}

$data = API\RegionService::call(["usa", $region['id']]);

usort($data['events'], function($a, $b){
    return DateTime::createFromFormat('Y-m-d H:i:s', $a['date']) < DateTime::createFromFormat('Y-m-d H:i:s', $b['date']) ? 1 : -1;
});

$_title[] = $region['title'];
$_description[] = "Browse Senate election results and data for {$region['title']}.";
$_breadcrumb = ['title' => $region['title'], 'path' => 'usa/senate-elections/state/' . USA\regionToSlug($region['title'])];
<?php
    $pages = [];
    $regions = API\RegionsService::call(["hungary"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . Hungary\regionToSlug($region['title']);
    }
?>
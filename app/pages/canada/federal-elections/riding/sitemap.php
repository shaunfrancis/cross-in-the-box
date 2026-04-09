<?php
    $pages = [];
    $regions = API\RegionsService::call(["canada"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . Canada\regionToSlug($region['title']);
    }
?>
<?php
    $pages = [];
    $regions = API\RegionsService::call(["france"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . France\regionToSlug($region['title']);
    }
?>
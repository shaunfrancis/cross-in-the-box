<?php
    $pages = [];
    $regions = API\RegionsService::call(["uk", "general"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . UK\regionToSlug($region['title']);
    }
?>
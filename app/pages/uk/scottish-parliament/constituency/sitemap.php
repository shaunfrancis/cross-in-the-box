<?php
    $pages = [];
    $regions = API\RegionsService::call(["uk", "scotland"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . UK\regionToSlug($region['title']);
    }
?>
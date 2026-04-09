<?php
    $pages = [];
    $regions = API\RegionsService::call(["uk", "wales"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . UK\regionToSlug($region['title']);
    }
?>
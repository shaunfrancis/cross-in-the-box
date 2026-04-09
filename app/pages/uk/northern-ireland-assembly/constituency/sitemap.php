<?php
    $pages = [];
    $regions = API\RegionsService::call(["uk", "ni"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . UK\regionToSlug($region['title']);
    }
?>
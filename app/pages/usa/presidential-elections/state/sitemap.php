<?php
    $pages = [];
    $regions = API\RegionsService::call(["usa", "presidential"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . USA\regionToSlug($region['title']);
    }
?>
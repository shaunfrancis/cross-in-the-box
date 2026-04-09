<?php
    $pages = [];
    $regions = API\RegionsService::call(["usa", "senate"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . USA\regionToSlug($region['title']);
    }
?>
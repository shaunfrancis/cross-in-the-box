<?php
    $pages = [];
    $regions = API\RegionsService::call(["nz"]);
    foreach($regions as $region){
        if(!empty($region['current'])) $pages[] = "/" . NewZealand\regionToSlug($region['title']);
    }
?>
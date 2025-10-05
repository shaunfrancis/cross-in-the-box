<?php
    namespace API;
    if(count($request) < 2) exit( APIService::fail(404, "Not found") );

    $special_resource = $request[1];
    switch($special_resource){
        case "live-close-counted-data": // special/usa/live-close-counted-data/ - get poll closing times and percent counted data
            echo LiveCloseCountedDataService::call($request);
            break;
        case "state-links": // special/usa/state-links/{baseId} - get state links from two-letter state abbreviation (baseId)
            echo StateLinksService::call($request);
            break;
        default:
            exit( APIService::fail(404, "Not found") );
    }
<?php
    $request = array_filter( explode( '/', str_replace('/elections/api/', '', $_SERVER['REQUEST_URI']) ) );
    $resource = array_shift($request);

    $accepted_countries = array("uk");
    
    switch($resource){
        case "results": // results/{country}/{election} - get results for a country by election ID
            require 'results.php';
            break;
        case "region": // region/{country}/{region} - get results for a region by country and region ID
            require 'region.php';
            break;
        case "regions": // regions/{country} - get list of regions by country ID
            require 'regions.php';
            break;
        case "search": // search/{country}/{query} - get list of regions by country with title or candidate name similarity to query
            require 'search.php';
            break;
        case "updates": // updates/{country}/{election} - get list of changes/updates to regions by country since election
            require 'updates.php';
            break;
        case "slug-lookup": // slug-lookup/{country}/{region-slug} - get country region ID from region slug
            require 'slug-lookup.php';
            break;
        default:
            fail(404, "Not found");
    }

    function fail($status, $error){
        http_response_code($status);
        exit( json_encode( array("error" => $error) ) );
    }
?>
<?php
    namespace API;
    header("Access-Control-Allow-Origin: *");

    $accepted_countries = array("canada", "uk", "usa", "vatican");
    $request = array_filter( preg_split( '/(\/|\?)/', str_replace(['/elections/api/','/api/'], '', $_SERVER['REQUEST_URI']) ) );
    $resource = array_shift($request);

    spl_autoload_register( function() use ($accepted_countries){
        foreach( glob(sprintf('%s/{%s}[!_]*.php', __DIR__, "," . implode("/,", $accepted_countries)), GLOB_BRACE) as $file ){
            require_once($file);
        }
    });

    if(count($request) == 0) exit( APIService::fail(404, "Not found") );

    $country = $request[0];
    if(!in_array($country, $accepted_countries)) exit( APIService::fail(404, "Not found") );
    
    switch($resource){
        case "elections": // elections/{country}/{election} - get election information for a country by election ID
            echo ElectionsService::call($request);
            exit;
            break;
        case "messages": // messages/{country}/{election} - get messages for a country by election ID
            echo MessagesService::call($request);
            break;
        case "parties": // parties/{country} - get parties by country ID
            echo PartiesService::call($request);
            break;
        case "polls":   // polls/{country} - get opinion polls by country ID
            echo PollsService::call($request);
            break;
        case "region": // region/{country}/{region} - get results for a region by country and region ID
            echo RegionService::call($request);
            break;
        case "regions": // regions/{country}/{type?} - get list of regions by country ID (matching a given type)?
            echo RegionsService::call($request);
            break;
        case "results": // results/{country}/{election} - get results for a country by election ID
            echo ResultsService::call($request);
            break;
        case "search": // search/{country}/{query}/{type?} - get list of regions by country with title or candidate name similarity to query (matching a given type)?
            echo SearchService::call($request);
            break;
        case "slug-lookup": // slug-lookup/{country}/{region-slug}/{type?} - get country region ID from region slug (matching a given type)?
            echo SlugLookupService::call($request);
            break;
        case "updates": // updates/{country}/{election} - get list of changes/updates to regions by country since election
            echo UpdatesService::call($request);
            break;
        case "special": // special/{country}/{function}/{params} - for special functions unique to country ID
            require $country . '/_entry.php';
            break;
        default:
            exit( APIService::fail(404, "Not found") );
    }
?>
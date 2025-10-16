<?php
    namespace API;
    header("Access-Control-Allow-Origin: *");

    $accepted_countries = array("canada", "uk", "usa", "vatican");
    $request = array_filter( preg_split( '/\//', str_replace(['/elections/api/','/api/'], '', $_SERVER['REQUEST_URI']) ) );
    $resource = array_shift($request);

    $parse_parameters = function($string){
        $parameters = [];
        
        $parameter_strings = explode("&", $string);
        foreach($parameter_strings as $parameter_string){
            $parameter_array = explode("=", $parameter_string);
            if(count($parameter_array) != 2) continue;

            if(substr($parameter_array[0], -2) == "[]") $parameters[substr($parameter_array[0], 0, -2)][] = $parameter_array[1];
            else $parameters[$parameter_array[0]] = $parameter_array[1];
        }

        return $parameters;
    };

    $params = [];
    $lastRequest = end($request);
    if(str_contains($lastRequest, "?")){
        $pieces = explode("?", $lastRequest, 2);
        $request[count($request) - 1] = $pieces[0];
        $params = $parse_parameters($pieces[1]);
    }

    spl_autoload_register( function() use ($accepted_countries){
        foreach( glob(sprintf('%s/{%s}[!_]*.php', __DIR__, "," . implode("/,", $accepted_countries)), GLOB_BRACE) as $file ){
            require_once($file);
        }
        require_once(__DIR__ . '/../app/lib/shared.php');
    });

    APIService::$apiMode = TRUE; //enables http_response_code() setting

    if(count($request) == 0) exit( json_encode(APIService::fail(404, "Not found")) );

    $country = $request[0];
    if(!in_array($country, $accepted_countries)) exit( json_encode(APIService::fail(404, "Not found")) );
    
    $response = match($resource){
        "elections" => ElectionsService::call($request, $params),   
                                                                // elections/{country}/{election}
                                                                // get election information for a country by election ID

        "messages" => MessagesService::call($request, $params), // messages/{country}/{election}
                                                                // get messages for a country by election ID
                                                                // [?string since] - messages after a given date
        
        "parties" => PartiesService::call($request, $params),   // parties/{country}
                                                                // get parties by country ID

        "polls" => PollsService::call($request, $params),       // polls/{country}
                                                                // get opinion polls by country ID

        "relationship" => RelationshipService::call($request, $params), 
                                                                // relationship/{country}/{relationship}
                                                                // get results for regions within a relationship ID
                                                                // [?string election] - only get results for specified election ID
                                                                

        "region" => RegionService::call($request, $params),     // region/{country}/{region}
                                                                // get results for a region by country and region ID
            
        "regions" => RegionsService::call($request, $params),   // regions/{country}/{type?}
                                                                // get list of regions by country ID (matching a given type)?
            
        "results" => ResultsService::call($request, $params),   // results/{country}/{election}
                                                                // get results for a country by election ID
                                                                // [?bool compact = false] - reduce keys to single letters and exclude candidate names
      
        "search" => SearchService::call($request, $params),     // search/{country}/{query}/{type?}
                                                                // get list of regions by country with title or candidate name similarity to query (matching a given type)?
            
        "slug-lookup" => SlugLookupService::call($request, $params),
                                                                // slug-lookup/{country}/{region-slug}/{type?}
                                                                // get country region ID from region slug (matching a given type)?
            
        "updates" => UpdatesService::call($request, $params),   // updates/{country}/{election}
                                                                // get list of changes/updates to regions by country since election
            
        "special" => require $country . '/_entry.php',          // special/{country}/{function}/{params}
                                                                // for special functions unique to country ID

        default => exit( json_encode(APIService::fail(404, "Not found")) )
    };

    echo json_encode($response, JSON_NUMERIC_CHECK);
?>
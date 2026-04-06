<?php
    namespace API;
    if(count($request) < 2) exit( json_encode(APIService::fail(404, "Not found")) );

    $special_resource = $request[1];
    switch($special_resource){
        case "state-links": // special/usa/state-links/{baseId} - get state links from two-letter state abbreviation (baseId)
            echo json_encode(USA\StateLinksService::call($request, $params), JSON_NUMERIC_CHECK);
            exit;
        default:
            exit( json_encode(APIService::fail(404, "Not found")) );
    }
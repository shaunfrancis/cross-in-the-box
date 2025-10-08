<?php
    namespace API;
    if(count($request) < 2) exit( json_encode(APIService::fail(404, "Not found")) );

    $special_resource = $request[1];
    switch($special_resource){
        case "portrait": // special/uk/portrait/{region} - get portrait ID for given region ID
            echo json_encode(UK\PortraitService::call($request), JSON_NUMERIC_CHECK);
            exit;
        default:
            exit( json_encode(APIService::fail(404, "Not found")) );
    }
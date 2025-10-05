<?php
    namespace API;
    if(count($request) < 2) exit( APIService::fail(404, "Not found") );

    $special_resource = $request[1];
    switch($special_resource){
        case "portrait": // special/uk/portrait/{region} - get portrait ID for given region ID
            echo PortraitService::call($country, $request);
            break;
        default:
            exit( APIService::fail(404, "Not found") );
    }
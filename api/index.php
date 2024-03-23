<?php
    $request = array_filter( explode( '/', str_replace('/elections/api/', '', $_SERVER['REQUEST_URI']) ) );
    $resource = array_shift($request);

    $accepted_countries = array("uk");
    
    switch($resource){
        case "results": // results/{country}/{election}
            require 'results.php';
            break;
        case "region": // results/{country}/{region}
            require 'region.php';
            break;
        default:
            fail(404, "Not found");
    }

    function fail($status, $error){
        http_response_code($status);
        exit( json_encode( array("error" => $error) ) );
    }
?>
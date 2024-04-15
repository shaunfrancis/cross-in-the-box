<?php
    if(count($request) < 2) fail(404, "Not found");

    $special_resource = $request[1];
    switch($special_resource){
        case "portrait":
            require 'portrait.php';
            break;
        default:
            fail(404, "Not found");
    }
?>
<?php
    if(count($request) < 2) fail(404, "Not found");

    $special_resource = $request[1];
    switch($special_resource){
        case "state-links":
            require 'state-links.php'; // special/state-links/{baseId} - get state links from two-letter state abbreviation (baseId)
            break;
        default:
            fail(404, "Not found");
    }
?>
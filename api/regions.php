<?php
    if(count($request) != 1) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    try{
        $regions = fetch("SELECT id, title FROM $regions_table");

        echo json_encode($regions, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
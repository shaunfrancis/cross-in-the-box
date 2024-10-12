<?php
    if(count($request) != 1 && count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    if(count($request) == 2) $type = $request[1];
    
    try{
        $query = "SELECT id, title, current FROM $regions_table";
        if(isset($type)) $query .= " WHERE type = :type";

        $regions = fetch($query, isset($type) ? [':type' => $type] : NULL);

        echo json_encode($regions, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
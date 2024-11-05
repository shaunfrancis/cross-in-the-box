<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    try{
        $data = fetch("SELECT id, close, counted FROM usa_live_close_counted_data");
        echo json_encode($data, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
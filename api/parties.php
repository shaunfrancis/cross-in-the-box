<?php
    if(count($request) != 1) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    try{
        $parties = fetch("SELECT id, title, color, textColor FROM $parties_table");
        foreach($parties as &$party){
            if(!isset($party['color'])) unset($party['color']);
            if(!isset($party['textColor'])) unset($party['textColor']);
        }

        echo json_encode($parties, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
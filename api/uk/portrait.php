<?php
    if(count($request) != 3) fail(404, "Not found");

    require_once './functions/fetch.php';
    $constituency = $request[2];
    
    try{
        $portrait_results = fetch(
            "SELECT portrait FROM uk_portraits WHERE constituency = :constituency",
            [':constituency' => $constituency]
        );

        if(count($portrait_results) == 0){
            echo json_encode( array( "hasPortrait" => FALSE ) );
            return;
        }

        $portrait_id = $portrait_results[0]['portrait'];
        echo json_encode( array( "hasPortrait" => TRUE, "id" => $portrait_id ) );
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
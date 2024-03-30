<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    $election = $request[1];
    
    try{
        $updates = fetch(
            "SELECT region_id as id, date, party FROM $updates_table WHERE election_id = :election ORDER BY date",
            [':election' => $election]
        );

        echo json_encode($updates, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
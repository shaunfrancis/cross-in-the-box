<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    $election = $request[1];
    
    try{
        $election_data = fetch(
            "SELECT id, date FROM $elections_table WHERE id = :election",
            [':election' => $election]
        );

        if(count($election_data) >= 1) echo json_encode($election_data[0], JSON_NUMERIC_CHECK);
        else fail(404, "Not found");
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
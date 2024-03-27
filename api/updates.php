<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    $country = $request[0];
    $election = $request[1];

    if(!in_array($country, $accepted_countries)) fail();
    $regions_table = $country . "_regions";
    $updates_table = $country . "_updates";
    $parties_table = $country . "_parties";
    
    try{
        $updates = fetch(
            "SELECT region_id as id, date, party FROM $updates_table WHERE election_id = :election ORDER BY date",
            [':election' => $election]
        );

        $parties = fetch(
            "SELECT DISTINCT parties.id, parties.title, parties.color, parties.textColor FROM $parties_table as parties JOIN $updates_table as updates ON updates.party = parties.id WHERE updates.election_id = :election",
            [':election' => $election]
        );
        foreach($parties as &$party){
            if(!isset($party['color'])) unset($party['color']);
            if(!isset($party['textColor'])) unset($party['textColor']);
        }

        echo json_encode( array("updates" => $updates, "parties" => $parties), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
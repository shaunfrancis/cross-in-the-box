<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    $election = $request[1];
    
    try{
        $election_results = fetch(
            "SELECT region_id as id, party, candidate, votes, elected FROM $results_table WHERE election_id = :election",
            [':election' => $election]
        );

        $regions = fetch(
            "SELECT DISTINCT regions.id, regions.title FROM $regions_table as regions JOIN $results_table as results ON results.region_id = regions.id WHERE results.election_id = :election",
            [':election' => $election]
        );

        $parties = fetch(
            "SELECT DISTINCT parties.id, parties.title, parties.color, parties.textColor FROM $parties_table as parties JOIN $results_table as results ON results.party = parties.id WHERE results.election_id = :election",
            [':election' => $election]
        );

        foreach($parties as &$party){
            if(!isset($party['color'])) unset($party['color']);
            if(!isset($party['textColor'])) unset($party['textColor']);
        }

        echo json_encode(array( "regions" => $regions, "results" => $election_results, "parties" => $parties ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
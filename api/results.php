<?php
    if(count($request) != 2) fail(404, "Not found");
    
    $country = $request[0];
    $election = $request[1];

    if(!in_array($country, $accepted_countries)) fail();
    $results_table = $country . "_results";
    $regions_table = $country . "_regions";
    $parties_table = $country . "_parties";
    
    try{
        $results_stmt = $pdo -> prepare("SELECT region_id as id, party, candidate, votes, elected FROM $results_table WHERE election_id = :election");
        $results_success = $results_stmt -> execute([':election' => $election]);
        if($results_success) $election_results = $results_stmt -> fetchAll(PDO::FETCH_ASSOC);
        else fail(400, "Bad request");

        $regions_stmt = $pdo -> prepare("SELECT DISTINCT regions.id, regions.title FROM $regions_table as regions JOIN $results_table as results ON results.region_id = regions.id WHERE results.election_id = :election");
        $regions_success = $regions_stmt -> execute([':election' => $election]);
        if($regions_success) $regions = $regions_stmt -> fetchAll(PDO::FETCH_ASSOC);
        else fail(400, "Bad request");

        $parties_stmt = $pdo -> prepare("SELECT DISTINCT parties.id, parties.title, parties.color, parties.textColor FROM $parties_table as parties JOIN $results_table as results ON results.party = parties.id WHERE results.election_id = :election");
        $parties_success = $parties_stmt -> execute([':election' => $election]);
        if($parties_success) $parties = $parties_stmt -> fetchAll(PDO::FETCH_ASSOC);
        else fail(400, "Bad request");

        foreach($parties as &$party){
            if(!isset($party['color'])) unset($party['color']);
            if(!isset($party['textColor'])) unset($party['textColor']);
        }

        echo json_encode(array( "regions" => $regions, "results" => $election_results, "parties" => $parties ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
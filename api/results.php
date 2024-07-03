<?php
    /* PARAMS:
        compact? = false : boolean   When true does not return candidate names and shortens column names
    */

    if(count($request) != 2 && count($request) != 3) fail(404, "Not found");

    require_once './functions/fetch.php';
    $election = $request[1];
    
    require_once './functions/parse_parameters.php';
    if(isset($request[2])) $parameters = parse_parameters($request[2]);
    
    try{
        if(isset($parameters["compact"]) && $parameters["compact"] == "true"){
            $election_sql = "SELECT region_id as id, party as p, votes as v, elected as e FROM $results_table WHERE election_id = :election";
        }
        else $election_sql = "SELECT region_id as id, party, candidate, votes, elected FROM $results_table WHERE election_id = :election";

        $election_results = fetch(
            $election_sql,
            [':election' => $election]
        );

        echo json_encode($election_results, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
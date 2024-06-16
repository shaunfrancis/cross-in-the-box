<?php
    if(count($request) != 1) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    try{
        $polls = fetch(
            "SELECT polls.id, pollsters.title as pollster, polls.client, polls.source, polls.start, polls.end, polls.sample 
            FROM $polls_table as polls
            LEFT JOIN $pollsters_table as pollsters
            ON pollsters.id = polls.pollster
            WHERE polls.start > '2019-12-12'
        ");
        $figures = fetch("SELECT poll_id, party, figure FROM $poll_figures_table");

        foreach($polls as &$poll){
            $poll = array_filter($poll);
        }

        echo json_encode(array("polls" => $polls, "figures" => $figures), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
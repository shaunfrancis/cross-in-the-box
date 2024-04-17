<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    $region = $request[1];
    
    try{
        //get boundary change tree
        $tree_results = fetch(
            "WITH RECURSIVE 
                ancestors AS (
                    SELECT changes.region_id, changes.successor_id, changes.direct_successor, changes.note, regions.title
                    FROM $boundary_changes_table as changes
                    LEFT JOIN $regions_table as regions ON changes.successor_id = regions.id
                    WHERE region_id = :region
                    
                    UNION ALL

                    SELECT c.region_id, c.successor_id, c.direct_successor, c.note, regions.title
                    FROM $boundary_changes_table as c
                    LEFT JOIN $regions_table as regions ON c.successor_id = regions.id
                    JOIN ancestors ON c.region_id = ancestors.successor_id 
                    WHERE ancestors.direct_successor = 1
                ),
                descendants AS (
                    SELECT changes.region_id, changes.successor_id, changes.direct_successor, changes.note, regions.title
                    FROM $boundary_changes_table as changes
                    LEFT JOIN $regions_table as regions ON changes.successor_id = regions.id
                    WHERE successor_id = :region

                    UNION ALL

                    SELECT c.region_id, c.successor_id, c.direct_successor, c.note, regions.title
                    FROM $boundary_changes_table as c
                    LEFT JOIN $regions_table as regions ON c.successor_id = regions.id
                    JOIN descendants ON c.successor_id = descendants.region_id 
                    WHERE descendants.direct_successor = 1
                )
            SELECT * FROM ancestors
            UNION
            SELECT * FROM descendants",
            [':region' => $region]
        );

        //get election results for all direct successors
        $direct_regions = array($region);
        foreach($tree_results as &$branch){
            $branch['direct_successor'] = boolval($branch['direct_successor']);
            if($branch['direct_successor']){
                if(!in_array($branch['region_id'], $direct_regions)) $direct_regions[] = $branch['region_id'];
                if(!in_array($branch['successor_id'], $direct_regions)) $direct_regions[] = $branch['successor_id'];
            }
        }
        $results = fetch(
            "SELECT res.region_id, reg.title as region_title, res.election_id as election, e.date as election_date, e.title as election_title, res.party, res.candidate, res.votes, res.elected 
            FROM $results_table as res
            JOIN $elections_table as e ON e.id = res.election_id
            JOIN $regions_table as reg ON reg.id = res.region_id
            WHERE region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)",
            $direct_regions
        );

        //get party data
        $parties = fetch(
            "SELECT DISTINCT parties.id, parties.title, parties.color, parties.textColor FROM $parties_table as parties JOIN $results_table as results ON results.party = parties.id WHERE results.region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)",
            $direct_regions
        );
        foreach($parties as &$party){
            if(!isset($party['color'])) unset($party['color']);
            if(!isset($party['textColor'])) unset($party['textColor']);
        }

        //format events
        $events = array();
        foreach($results as $result){

            $matching_event = false;
            foreach($events as &$event){
                if($event['region']['id'] == $result['region_id'] && $event['data']['id'] == $result['election']){
                    $matching_event = true;
                    unset($result['region_id'], $result['region_title'], $result['election'], $result['election_date'], $result['election_title']);
                    $event['data']['results'][] = $result;
                    break;
                }
            }

            if(!$matching_event){
                $new_event = array( 
                    "type" => "election",
                    "date" => $result['election_date'],
                    "region" => array(
                        "id" => $result['region_id'],
                        "title" => $result['region_title']
                    ),
                    "data" => array(
                        "id" => $result['election'], 
                        "title" => json_decode($result['election_title'])
                    )
                );
                unset($result['region_id'], $result['region_title'], $result['election'], $result['election_date'], $result['election_title']);
                $new_event['data']['results'] = array($result);
                $events[] = $new_event;
            }
        }

        echo json_encode(array( "events" => $events, "parties" => $parties, "tree" => $tree_results ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    $country = $request[0];
    $region = $request[1];

    if(!in_array($country, $accepted_countries)) fail();
    $results_table = $country . "_results";
    $regions_table = $country . "_regions";
    $boundary_changes_table = $country . "_boundary_changes";
    $elections_table = $country . "_elections";
    
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
            if($branch['direct_successor'] == 1){
                if(!in_array($branch['region_id'], $direct_regions)) $direct_regions[] = $branch['region_id'];
                if(!in_array($branch['successor_id'], $direct_regions)) $direct_regions[] = $branch['successor_id'];
            }
        }
        $results = fetch(
            "SELECT region_id as region, election_id as election, party, candidate, votes, elected FROM $results_table WHERE region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)",
            $direct_regions
        );

        //get election data for all elections returned
        $election_ids = array();
        foreach($results as &$result){
            if(!in_array($result['election'], $election_ids)) $election_ids[] = $result['election'];
        }
        $elections = fetch(
            "SELECT id, date from $elections_table WHERE id IN (" . str_repeat("?,", count($election_ids) - 1) . "?) ORDER BY date DESC",
            $election_ids
        );

        /*format response
        { 
            tree: Array<{
                region_id,
                successor_id,
                direct_successor,
                note,
                title
            }>, 
            elections: Array<{
                id,
                date
            }>,
            results: Array<{
                election,
                region,
                results: Array<{party, candidate, votes, elected}>
            }>
        }*/
        $election_results = array();
        foreach($direct_regions as &$direct_region){

            $regional_election_ids = array();
            $region_results = array_filter($results, function($result) use ($direct_region){
                return $result['region'] == $direct_region;
            });
            foreach($region_results as &$result){
                if(!in_array($result['election'], $regional_election_ids)) $regional_election_ids[] = $result['election'];
            }

            foreach($regional_election_ids as &$election_id){
                $region_election_results = array_filter( $region_results, function($result) use ($election_id){
                    return $result['election'] == $election_id;
                });

                $regional_election_results = array();
                array_walk( $region_election_results, function($result) use (&$regional_election_results){
                    $regional_election_results[] = array( "party" => $result['party'], "candidate" => $result['candidate'], "votes" => $result['votes'], "elected" => $result['elected'] );
                });

                $election_results[] = array(
                    "election" => $election_id,
                    "region" => $direct_region,
                    "results" => $regional_election_results
                );
            }
        }

        echo json_encode(array( "tree" => $tree_results, "elections" => $elections, "results" => $election_results ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
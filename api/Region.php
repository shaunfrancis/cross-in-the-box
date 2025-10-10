<?php
namespace API;
class RegionService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);
        if(count($request) != 2) return self::fail(404, "Not found");

        $region = $request[1];
        
        try{
            //get boundary change tree
            $tree_results = self::fetch(
                "WITH RECURSIVE 
                    ancestors AS (
                        SELECT changes.region_id, changes.successor_id, changes.direct_successor, changes.note, regions.title
                        FROM $tables->boundary_changes as changes
                        LEFT JOIN $tables->regions as regions ON changes.successor_id = regions.id
                        WHERE region_id = :region
                        
                        UNION ALL

                        SELECT c.region_id, c.successor_id, c.direct_successor, c.note, regions.title
                        FROM $tables->boundary_changes as c
                        LEFT JOIN $tables->regions as regions ON c.successor_id = regions.id
                        JOIN ancestors ON c.region_id = ancestors.successor_id 
                        WHERE ancestors.direct_successor = 1
                    ),
                    descendants AS (
                        SELECT changes.region_id, changes.successor_id, changes.direct_successor, changes.note, regions.title
                        FROM $tables->boundary_changes as changes
                        LEFT JOIN $tables->regions as regions ON changes.successor_id = regions.id
                        WHERE successor_id = :region

                        UNION ALL

                        SELECT c.region_id, c.successor_id, c.direct_successor, c.note, regions.title
                        FROM $tables->boundary_changes as c
                        LEFT JOIN $tables->regions as regions ON c.successor_id = regions.id
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
            $results = self::fetch(
                "SELECT 
                results.region_id, results.election_id as election, results.election_subid as subid, results.party, results.votes,
                candidates.candidate, candidates.position as candidate_position, candidates.elected,
                elections.date as election_date, elections.title as election_title, 
                regions.title as region_title
                FROM $tables->results as results
                JOIN $tables->candidates as candidates ON candidates.result_id = results.id
                JOIN $tables->elections as elections ON elections.id = results.election_id
                JOIN $tables->regions as regions ON regions.id = results.region_id
                WHERE region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)",
                $direct_regions
            );

            //get update notes
            $updates = self::fetch(
                "SELECT updates.election_id, updates.region_id, regions.title, updates.date, updates.party, updates.note FROM $tables->updates as updates
                JOIN $tables->regions as regions ON regions.id = updates.region_id
                WHERE region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)",
                $direct_regions
            );

            //get party data
            $parties = self::fetch(
                "SELECT DISTINCT parties.id, parties.title, parties.color, parties.textColor 
                FROM $tables->parties as parties 
                LEFT JOIN $tables->results as results ON results.party = parties.id AND results.region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)
                LEFT JOIN $tables->updates as updates ON updates.party = parties.id AND updates.region_id IN (" . str_repeat("?,", count($direct_regions) - 1) . "?)
                WHERE results.party IS NOT NULL OR updates.party IS NOT NULL",
                array(...$direct_regions, ...$direct_regions)
            );
            foreach($parties as &$party){
                if(!isset($party['color'])) unset($party['color']);
                if(!isset($party['textColor'])) unset($party['textColor']);
            }

            /*Format events:
                "type" => string,
                "date" => string,
                "region" => array( "id" => string, "title" => string ),
                "data" => array( ... )
            */
            $events = array();
            foreach($results as $result){
                if(is_null($result['subid'])) unset($result['subid']);
                if(is_null($result['candidate_position'])) unset($result['candidate_position']);

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
                    if(array_key_exists("subid", $result)) $new_event['data']['subid'] = $result['subid'];

                    unset($result['region_id'], $result['region_title'], $result['election'], $result['election_date'], $result['election_title']);
                    $new_event['data']['results'] = array($result);
                    $events[] = $new_event;
                }
            }

            foreach($updates as $update){
                $new_event = array(
                    "type" => "update",
                    "date" => $update['date'],
                    "region" => array(
                        "id" => $update["region_id"],
                        "title" => $update["title"]
                    ),
                    "data" => array(
                        "party" => $update['party'],
                        "note" => $update['note']
                    )

                );
                $events[] = $new_event;
            }

            return array( "events" => $events, "parties" => $parties, "tree" => $tree_results );
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
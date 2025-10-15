<?php
namespace API;
class RelationshipService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);

        if(count($request) != 2) return self::fail(404, "Not found");

        $relationship = $request[1];
        
        try{
            $regions = self::fetch(
                "SELECT region_id FROM $tables->relationships WHERE relationship_id = :relationship",
                [':relationship' => $relationship]
            );

            if(count($regions) < 1) return self::fail(404, "Not found");
            else{
                $regions = array_map(fn($region) => $region['region_id'], $regions);
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
                    WHERE region_id IN (" . str_repeat("?,", count($regions) - 1) . "?)",
                    $regions
                );
                return $results;
            }
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
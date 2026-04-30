<?php
namespace API;
class ResultsService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);

        $compact = !empty($params["compact"]) && $params["compact"] == "true";

        if(count($request) != 2) return self::fail(404, "Not found");

        $election = $request[1];
        
        try{
            if($compact){
                $election_sql = "
                    SELECT results.region_id as id, results.election_subid as s, results.party as p, results.votes as v, 
                    candidates.elected as e 
                    FROM $tables->results as results
                    LEFT JOIN $tables->candidates as candidates ON results.id = candidates.result_id
                    WHERE election_id = :election
                ";
            }
            else $election_sql = "
                SELECT results.region_id as id, results.election_subid as subid, results.party, results.votes, 
                candidates.result_id, candidates.candidate, candidates.position as candidate_position, candidates.elected
                FROM $tables->results as results
                LEFT JOIN $tables->candidates as candidates ON results.id = candidates.result_id
                WHERE election_id = :election
            ";

            $election_results = self::fetch(
                $election_sql,
                [':election' => $election]
            );

            foreach($election_results as &$result){
                if(!isset($result['subid'])) unset($result['subid']);
                if(!isset($result['candidate_position'])) unset($result['candidate_position']);
                if(!isset($result['s'])) unset($result['s']);
            }

            if(!$compact) $election_results = \Shared\combineCandidates($election_results);

            return $election_results;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
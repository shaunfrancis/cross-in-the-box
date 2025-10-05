<?php
namespace API;
class ResultsService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);
        /* PARAMS:
            compact? = false : boolean   When true does not return candidate names and shortens column names
        */

        if(count($request) != 2 && count($request) != 3) return self::fail(404, "Not found");

        $election = $request[1];
        
        if(isset($request[2])) $parameters = self::parse_parameters($request[2]);
        
        try{
            if(isset($parameters["compact"]) && $parameters["compact"] == "true"){
                $election_sql = "SELECT region_id as id, election_subid as s, party as p, votes as v, elected as e FROM $tables->results WHERE election_id = :election";
            }
            else $election_sql = "SELECT region_id as id, election_subid as subid, party, candidate, votes, elected FROM $tables->results WHERE election_id = :election";

            $election_results = self::fetch(
                $election_sql,
                [':election' => $election]
            );

            foreach($election_results as &$result){
                if(!isset($result['subid'])) unset($result['subid']);
                if(!isset($result['s'])) unset($result['s']);
            }

            return json_encode($election_results, JSON_NUMERIC_CHECK);
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
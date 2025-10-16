<?php
namespace API;
class UpdatesService extends APIService{

    static function call(array $request, ?array $params = []){
        $tables = parent::setup($request[0]);
        if(count($request) != 2) return self::fail(404, "Not found");

        $election = $request[1];
        
        try{
            $updates = self::fetch(
                "SELECT region_id as id, date, party FROM $tables->updates WHERE election_id = :election ORDER BY date",
                [':election' => $election]
            );

            return $updates;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
<?php
namespace API;
class ElectionsService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);

        if(count($request) != 2) return self::fail(404, "Not found");

        $election = $request[1];
        
        try{
            $election_data = self::fetch(
                "SELECT id, date FROM $tables->elections WHERE id = :election",
                [':election' => $election]
            );

            if(count($election_data) >= 1) return json_encode($election_data[0], JSON_NUMERIC_CHECK);
            else return self::fail(404, "Not found");
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
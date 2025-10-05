<?php
namespace API;
class PortraitService extends APIService{

    static function call(array $request){
        $tables = parent::setup($country);
        if(count($request) != 3) return self::fail(404, "Not found");

        $constituency = $request[2];
        
        try{
            $portrait_results = self::fetch(
                "SELECT portrait FROM uk_portraits WHERE constituency = :constituency",
                [':constituency' => $constituency]
            );

            if(count($portrait_results) == 0){
                return json_encode( array( "hasPortrait" => FALSE ) );
                return;
            }

            $portrait_id = $portrait_results[0]['portrait'];
            return json_encode( array( "hasPortrait" => TRUE, "id" => $portrait_id ) );
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
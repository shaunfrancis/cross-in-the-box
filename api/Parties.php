<?php
namespace API;
class PartiesService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);
        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $parties = self::fetch("SELECT id, title, color, textColor FROM $tables->parties");
            foreach($parties as &$party){
                if(!isset($party['color'])) unset($party['color']);
                if(!isset($party['textColor'])) unset($party['textColor']);
            }

            return json_encode($parties, JSON_NUMERIC_CHECK);
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }
    
}
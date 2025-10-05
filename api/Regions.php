<?php
namespace API;
class RegionsService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);
        if(count($request) != 1 && count($request) != 2) return self::fail(404, "Not found");
        if(count($request) == 2) $type = $request[1];
        
        try{
            $query = "SELECT id, title, current FROM $tables->regions";
            if(isset($type)) $query .= " WHERE type = :type";

            $regions = self::fetch($query, isset($type) ? [':type' => $type] : NULL);

            return $regions;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
        
    }
}
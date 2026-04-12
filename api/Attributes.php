<?php
namespace API;
class AttributesService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);

        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $attributes = self::fetch(
                "SELECT region_id, label, value, applies_to
                FROM $tables->attributes as attributes"
            );

            return $attributes;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
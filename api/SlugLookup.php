<?php
namespace API;
class SlugLookupService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);
        if(count($request) != 2 && count($request) != 3) return self::fail(404, "Not found");

        $slug = urldecode($request[1]);
        if(count($request) == 3) $type = $request[2];

        // First, lowercase the title
        // Then, replace , ( ) ' with empty string
        // Then replace spaces and em dashes with hyphen
        $sql = "SELECT id, title, current FROM $tables->regions WHERE 
            REGEXP_REPLACE(
                REGEXP_REPLACE(LOWER(title), '[,()\\']', ''),
                '[ —]',
                '-'
            ) = :slug";
        $params = [':slug' => $slug];

        if(isset($type)){
            $sql .= " AND type = :type";
            $params[':type'] = $type;
        }
        
        try{
            $regions = self::fetch( $sql, $params );

            if(count($regions) == 0) return self::fail(404, "Not found");
            else{
                $currentRegion = array_find($regions, fn($region) => $region['current'] == 1);
                return $currentRegion ?? $regions[0];
            }
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
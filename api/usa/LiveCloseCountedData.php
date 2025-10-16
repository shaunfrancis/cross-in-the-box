<?php
namespace API\USA;
class LiveCloseCountedDataService extends \API\APIService{

    static function call(array $request, ?array $params = []){
        if(count($request) != 2) return self::fail(404, "Not found");
        
        try{
            $data = self::fetch("SELECT id, close, counted FROM usa_live_close_counted_data");
            return $data;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }
}
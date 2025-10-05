<?php
namespace API;
class LiveCloseCountedDataService extends APIService{

    static function call(array $request){
        if(count($request) != 2) return self::fail(404, "Not found");
        
        try{
            $data = self::fetch("SELECT id, close, counted FROM usa_live_close_counted_data");
            return json_encode($data, JSON_NUMERIC_CHECK);
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }
}
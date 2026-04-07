<?php
namespace API\UK;
class PortraitService extends \API\APIService{

    static function call(array $request, ?array $params = []){
        $tables = parent::setup($request[0]);
        if(count($request) != 3) return self::fail(404, "Not found");

        $constituency = $request[2];
        
        try{
            $portrait_results = self::fetch(
                "SELECT portrait FROM uk_portraits WHERE constituency = :constituency",
                [':constituency' => $constituency]
            );

            if(count($portrait_results) == 0){
                return array( "hasPortrait" => FALSE );
            }

            $portrait_id = $portrait_results[0]['portrait'];


            $src = sprintf("https://members-api.parliament.uk/api/Members/%s/Portrait?cropType=ThreeTwo&webVersion=false", $portrait_id);
            $attribution = sprintf("https://members.parliament.uk/member/%s/portrait", $portrait_id);

            $headers = @get_headers($src);
            if(empty($headers) || !preg_grep('~^HTTP/\d+\.\d+\s+2\d{2}~', $headers)) return array( "hasPortrait" => FALSE );

            return array( "hasPortrait" => TRUE, "src" => $src, "attribution" => $attribution );
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
<?php
namespace API;
class LiveEventsService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0] ?? "");
        $country_query = "";

        if(count($request) > 1) return self::fail(404, "Not found");
        else if(count($request) == 1){
            $country_query = "country = :country AND ";
            $variables[':country'] = self::$country;
        }
        
        try{
            $live_events = self::fetch(
                "SELECT country, election_id, election_subid, destination, global_notification, local_notification FROM $tables->live_events WHERE {$country_query}started < NOW() AND (ended > NOW() OR ended IS NULL OR ended = '')",
                $variables ?? [],
                ttl: (\ENV === "dev") ? 0 : 3600
            );
            return $live_events;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
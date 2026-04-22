<?php
namespace API;
class LiveEventsService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);

        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $live_events = self::fetch(
                "SELECT election_id, election_subid FROM $tables->live_events WHERE country = :country AND started < NOW() AND (ended > NOW() OR ended IS NULL OR ended = '')",
                [':country' => self::$country],
                ttl: 3600
            );
            return $live_events;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
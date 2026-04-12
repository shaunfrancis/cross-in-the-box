<?php
namespace API;
class PartiesService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);
        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $parties = self::fetch(
                "SELECT parties.id, parties.displayId, parties.title, parties.color, parties.textColor,
                links.linked_to, links.link_type
                FROM $tables->parties as parties
                LEFT JOIN $tables->party_links as links ON parties.id = links.party_id"
            );
            foreach($parties as &$party){
                if(!isset($party['displayId'])) unset($party['displayId']);
                if(!isset($party['linked_to'])) unset($party['linked_to']);
                if(!isset($party['link_type'])) unset($party['link_type']);
                if(!isset($party['color'])) unset($party['color']);
                if(!isset($party['textColor'])) unset($party['textColor']);
            }

            return $parties;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }
    
}
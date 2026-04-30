<?php
namespace API;
class PartiesService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);
        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $parties = self::fetch(
                "SELECT parties.id, parties.displayId, titles.data as titles, parties.color, parties.textColor,
                links.linked_to, links.link_type
                FROM $tables->parties as parties
                LEFT JOIN (
		            SELECT titles.party_id, 
                        JSON_ARRAYAGG(
                            JSON_MERGE_PATCH(
                                JSON_OBJECT(
                                    'title', titles.title,
                                    'lang', titles.lang
                                ),
                                CASE 
                                    WHEN titles.primary = 1 THEN JSON_OBJECT('primary', 1) ELSE JSON_OBJECT()
                                END
                            )
                        ) as data
                    FROM $tables->party_titles as titles
                    GROUP BY titles.party_id
	            ) as titles ON titles.party_id = parties.id
                LEFT JOIN $tables->party_links as links ON parties.id = links.party_id"
            );
            foreach($parties as &$party){
                if(!isset($party['displayId'])) unset($party['displayId']);
                if(!isset($party['linked_to'])) unset($party['linked_to']);
                if(!isset($party['link_type'])) unset($party['link_type']);
                if(!isset($party['color'])) unset($party['color']);
                if(!isset($party['textColor'])) unset($party['textColor']);
                $party['titles'] = json_decode($party['titles'] ?? '[]', TRUE);
            }

            return $parties;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }
    
}
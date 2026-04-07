<?php
namespace API;
class MessagesService extends APIService{
    
    static function call(array $request, ?array $params = []){
        $tables = parent::setup($request[0]);

        if(count($request) != 2) return self::fail(404, "Not found");

        $group = $request[1];

        /* result_types
            0: percentage table
            1: raw table
        */

        $messages_sql = "SELECT messages.id, messages.date, messages.square, messages.old_square, messages.header, messages.pinned, messages.text, links.id as link, links.type, links.title as link_title, results.party, results.votes 
        FROM $tables->messages as messages
        LEFT JOIN $tables->message_links as links
        ON links.message_id = messages.id
        LEFT JOIN $tables->results as results
        ON results.election_id = links.election_id AND results.region_id = links.region_id AND (links.election_subid IS NULL OR results.election_subid = links.election_subid)
        WHERE messages.group_id = :group";

        if(!empty($params["since"])){
            $messages_sql .= " AND messages.update_date >= :since";
            $messages_params = [':group' => $group, ':since' => $params["since"]];
        }
        else $messages_params = [':group' => $group];
        
        try{
            $messages = self::fetch( $messages_sql, $messages_params );

            $parsed_messages = array();
            foreach($messages as $message){
                if(!isset($message['link'])){
                    $message_array = array(
                        "id" => $message['id'],
                        "date" => $message['date'],
                        "square" => $message['square'],
                        "old_square" => $message['old_square'],
                        "text" => $message['text']
                    );
                    if($message['header'] == '0') $message_array['no_header'] = true;
                    if(!is_null($message['pinned'])) $message_array['pinned'] = $message['pinned'];
                    if(isset($message['type']) && $message['type'] != '0') $message_array['result_type'] = $message['type'];
                    $parsed_messages[] = $message_array;
                    continue;
                }

                $match = false;
                foreach($parsed_messages as &$parsed_message){
                    if($parsed_message['id'] == $message['id']){
                        $match = true;
                        $parsed_message['results'][] = array("party" => $message['party'], "votes" => $message['votes']);
                        break;
                    }
                }

                if(!$match){
                    $message_array = array(
                        "id" => $message['id'],
                        "date" => $message['date'],
                        "square" => $message['square'],
                        "old_square" => $message['old_square'],
                        "text" => $message['text'],
                        "results" => array(
                            array("party" => $message['party'], "votes" => $message['votes'])
                        )
                    );
                    if($message['header'] == '0') $message_array['no_header'] = true;
                    if(!is_null($message['pinned'])) $message_array['pinned'] = $message['pinned'];
                    if(isset($message['type']) && $message['type'] != '0') $message_array['result_type'] = $message['type'];
                    if(isset($message['link_title'])) $message_array["link_title"] = $message['link_title'];
                    $parsed_messages[] = $message_array;
                }
            }

            array_multisort(array_column($parsed_messages, 'date'), SORT_DESC, $parsed_messages);

            return $parsed_messages;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }
}
<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    $group = $request[1];
    
    try{
        $messages = fetch(
            "SELECT messages.id, messages.date, messages.text, links.id as link, results.party, results.votes 
            FROM $messages_table as messages
            LEFT JOIN $message_links_table as links
            ON links.message_id = messages.id
            LEFT JOIN $results_table as results
            ON results.election_id = links.election_id AND results.region_id = links.region_id
            WHERE messages.group_id = :group",
            [':group' => $group]
        );

        $parsed_messages = array();
        foreach($messages as $message){
            if(!isset($message['link'])){
                $parsed_messages[] = array("date" => $message['date'], "text" => $message['text']);
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
                $parsed_messages[] = array(
                    "id" => $message['id'],
                    "date" => $message['date'],
                    "text" => $message['text'],
                    "results" => array(
                        array("party" => $message['party'], "votes" => $message['votes'])
                    )
                );
            }
        }

        foreach($parsed_messages as &$pm){
            unset($pm['id']);
        }
        array_multisort(array_column($parsed_messages, 'date'), SORT_DESC, $parsed_messages);

        echo json_encode($parsed_messages, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
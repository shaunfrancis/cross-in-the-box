<?php
namespace API;
class PollsService extends APIService{

    static function call(array $request){
        $tables = parent::setup($request[0]);
        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $polls = self::fetch(
                "SELECT polls.id, pollsters.title as pollster, polls.client, polls.source, polls.start, polls.end, polls.sample 
                FROM $tables->polls as polls
                LEFT JOIN $tables->pollsters as pollsters
                ON pollsters.id = polls.pollster
                WHERE polls.start > '2021-12-31'
            ");
            $figures = self::fetch("SELECT poll_id, party, figure FROM $tables->poll_figures");

            foreach($polls as &$poll){
                $poll = array_filter($poll);
            }

            return json_encode(array("polls" => $polls, "figures" => $figures), JSON_NUMERIC_CHECK);
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
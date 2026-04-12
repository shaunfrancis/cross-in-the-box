<?php
namespace API;
class PollsService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);
        if(count($request) != 1) return self::fail(404, "Not found");
        
        try{
            $polls = self::fetch(
                "SELECT polls.id, pollsters.title as pollster, polls.client, polls.source, polls.start, polls.end, polls.sample,
                polls.start + INTERVAL TIMESTAMPDIFF(SECOND, polls.start, polls.end) / 2 SECOND as centre,
                figures.data as figures

                FROM $tables->polls as polls

                LEFT JOIN $tables->pollsters as pollsters ON pollsters.id = polls.pollster

                LEFT JOIN (
		            SELECT figures.poll_id, 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'party', figures.party,
                                'figure', figures.figure
                            )
                        ) as data
                    FROM $tables->poll_figures as figures
                    GROUP BY figures.poll_id
	            ) as figures ON figures.poll_id = polls.id

                WHERE polls.start > '2023-12-24'
                ORDER BY centre DESC
            ");

            foreach($polls as &$poll){
                $poll = array_filter($poll);
                $poll['centre'] = new \DateTimeImmutable($poll['centre']);
                $poll['figures'] = json_decode($poll['figures'] ?? '[]', TRUE);
            }

            return $polls;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
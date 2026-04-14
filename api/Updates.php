<?php
namespace API;
class UpdatesService extends APIService{

    static function call(array $request, ?array $params = []){
        parent::call($request, $params);
        
        $tables = parent::setup($request[0]);
        if(count($request) != 2) return self::fail(404, "Not found");

        $election = $request[1];
        
        try{
            $updates = self::fetch(
                "SELECT updates.region_id as id, updates.date, updates.party, updates.note,

                CASE 
                    WHEN links.id IS NOT NULL THEN
                        JSON_OBJECT(
                            'title', elections.title,
                            'data', JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'votes', results.votes,
                                    'party', results.party,
                                    'candidates', (
                                        SELECT JSON_ARRAYAGG(
                                            JSON_OBJECT(
                                                'name', candidates.candidate,
                                                'elected', candidates.elected
                                            )
                                        )
                                        FROM $tables->candidates AS candidates
                                        WHERE candidates.result_id = results.id
                                    )
                                )
                            )
                        )
                    ELSE NULL END 
                as results

                FROM $tables->updates as updates
                LEFT JOIN $tables->update_links as links ON updates.id = links.update_id
                LEFT JOIN $tables->results as results ON results.election_id = links.election_id AND results.region_id = updates.region_id
                LEFT JOIN $tables->elections as elections ON elections.id = links.election_id
                WHERE updates.election_id = :election
                GROUP BY updates.id, links.id
                ORDER BY updates.date",
                [':election' => $election]
            );

            foreach($updates as &$update){
                if(empty($update['results'])) unset($update['results']);
                else{
                    $update['results'] = json_decode($update['results'], TRUE);
                    $update['results']['title'] = json_decode($update['results']['title'], TRUE);
                }
            }

            return $updates;
        }
        catch(\Exception $error){ return self::fail(500, "Internal server error"); }
    }

}
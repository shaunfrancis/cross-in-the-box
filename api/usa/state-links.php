<?php
    if(count($request) != 3) fail(404, "Not found");

    require_once './functions/fetch.php';
    $baseId = $request[2];
    
    try{
        $president = "2012" . $baseId . "%";
        $senate = "S" . $baseId . "%";
        $house = "2012" . $baseId . "%";
        $governor = "G" . $baseId;

        $sql = "WITH data AS (
                    SELECT usa_regions.title, usa_results.region_id, usa_parties.color, usa_parties.textColor, usa_regions.type, usa_elections.date, ROW_NUMBER() OVER (PARTITION BY usa_results.region_id ORDER BY date DESC) as row
                    FROM usa_results
                    JOIN usa_regions ON usa_regions.id = usa_results.region_id
                    JOIN usa_elections ON usa_elections.id = usa_results.election_id
                    LEFT JOIN usa_parties ON usa_parties.id = usa_results.party
                    WHERE usa_results.elected = 1/*
                    AND usa_regions.current = 1
                    */AND (usa_regions.id LIKE :president OR usa_regions.id LIKE :senate OR usa_regions.id LIKE :house OR usa_regions.id LIKE :governor)
                )
                SELECT title, region_id, color, textColor, type, date
                FROM data
                WHERE row = 1
            ";

        $links = fetch(
            $sql,
            [':president' => $president, ':senate' => $senate, ':house' => $house, ':governor' => $governor]
        );

        foreach($links as &$link){
            switch($link['type']){
                case "presidential":
                    if(str_contains($link['title'], "At-Large")) $link['label'] = "At-Large";
                    else if(str_contains($link['title'], "Congressional")){
                        $link['label'] = preg_split("/\(|( Con)/", $link['title'])[1] . " District";
                    }
                    break;
                case "senate":
                    $link['label'] = preg_split("/\(|\)/", $link['title'])[1];
                    break;
                case "house":
                    $fragments = preg_split("/\ /", $link['title']);
                    $link['label'] = end( $fragments );
                    break;
            }
        }

        echo json_encode( $links );
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
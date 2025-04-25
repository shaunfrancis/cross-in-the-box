<?php
    if(count($request) != 2 && count($request) != 3) fail(404, "Not found");

    require_once './functions/fetch.php';
    $query = urldecode($request[1]);
    if(count($request) == 3) $type = $request[2];

    function get_overlap($a, $b){
        $a_words = explode(" ", strtolower($a));
        $b_words = explode(" ", strtolower($b));
        $overlap = 0;
        $coverage = 0;
        foreach($a_words as $a_word){
            foreach($b_words as $b_word){
                if(str_contains($a_word, $b_word)){
                    $overlap++;
                    $coverage += strlen($b_word) / strlen($a);
                    break;
                }
            }
        }
        return $overlap + min($coverage, 0.99);
    }
    
    try{
        $words = preg_split('/ |-|—/', strtolower($query));
        $filtered_words = array_filter($words, function($word){
            return !in_array(trim($word), ["and", "the", ""]);
        });
        if(count($filtered_words) > 0) $words = array_values($filtered_words);

        foreach($words as &$word) $word = "%" . $word . "%";

        $params = [...$words];
        if(isset($type)) $params[] = $type;

        $regions_sql = "SELECT id, title, current FROM $regions_table WHERE (" . str_repeat("LOWER(title) LIKE ? OR ", count($words) - 1) . "LOWER(title) LIKE ?)";
        if(isset($type)) $regions_sql .= " AND type = ?";

        $regions = fetch( $regions_sql, $params );
        
        //remove abolished regions with identical names (up to commas) to current regions
        $regions = array_filter( $regions, function($region) use ($regions){
            if($region['current'] == 1) return TRUE;
            foreach($regions as $r){
                if($r['current'] == 1 && str_replace(",","",$r['title']) == str_replace(",","",$region['title'])) return FALSE;
            }
            return TRUE;
        });

        usort($regions, function($a, $b) use ($query){ //sort by currentness, then overlap, then title
            $overlap = get_overlap($b['title'], $query) <=> get_overlap($a['title'], $query);
            if( ($a['current'] <=> $b['current']) != 0) return $b['current'] <=> $a['current'];
            else if($overlap != 0) return $overlap;
            else return $b['title'] <=> $a['title'];
        });


        if($country == "uk"){
            require_once './functions/uk_postcode_search.php';
            $region_titles = uk_postcode_search($query);

            if(count($region_titles) > 0){
                $postcode_regions = fetch(
                    "SELECT id, title, current FROM $regions_table WHERE current = 1 AND (" . str_repeat("LOWER(title) LIKE ? OR ", count($region_titles) - 1) . "LOWER(title) LIKE ?)",
                    $region_titles
                );
                
                $regions = array_merge($postcode_regions, $regions);
            }
        }


        $type_fragment = isset($type) ? " AND regions.type = ?" : "";
        $candidates_sql = "SELECT * FROM (
            SELECT regions.id, regions.title, results.candidate, results.party, results.votes, elections.title as election, elections.date, parties.title as party_title, parties.color, parties.textColor
            FROM $results_table as results
            JOIN $regions_table as regions
            ON regions.id = results.region_id
            JOIN $elections_table as elections
            ON elections.id = results.election_id
            JOIN $parties_table as parties
            ON parties.id = results.party
            WHERE (" . str_repeat("LOWER(results.candidate) LIKE ? OR ", count($words) - 1) . "LOWER(results.candidate) LIKE ?)" . $type_fragment . "
            ORDER BY elections.date DESC
            LIMIT 18446744073709551615
        ) as res
        GROUP BY res.candidate";
        //LIMIT 2^64 - 1 forces MariaDB subquery to respect ORDER

        $candidates = fetch(
            $candidates_sql,
            $params
        );
        usort($candidates, function($a, $b) use ($query){
            $overlap = get_overlap($b['candidate'], $query) <=> get_overlap($a['candidate'], $query);
            if($overlap != 0) return $overlap;

            $latest = $b['date'] <=> $a['date'];
            if($latest != 0) return $latest; 
            else return $b['votes'] <=> $a['votes'];
        });

        foreach($candidates as &$candidate){
            $candidate['election'] = json_decode($candidate['election']);
            $party = array(
                "id" => $candidate['party'],
                "title" => $candidate['party_title']
            );
            if(isset($candidate['color'])) $party['color'] = $candidate['color'];
            if(isset($candidate['textColor'])) $party['textColor'] = $candidate['textColor'];
            $candidate['party'] = $party;
            unset($candidate['party_title'], $candidate['color'], $candidate['textColor'], $candidate['votes']);
        }

        echo json_encode( array( "regions" => $regions, "candidates" => $candidates ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
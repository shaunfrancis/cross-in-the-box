<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    $country = $request[0];
    $query = urldecode($request[1]);

    if(!in_array($country, $accepted_countries)) fail();
    $regions_table = $country . "_regions";
    $results_table = $country . "_results";

    function getOverlap($a, $b){
        $a_words = explode(" ", strtolower($a));
        $b_words = explode(" ", strtolower($b));
        $overlap = 0;
        foreach($a_words as $a_word){
            foreach($b_words as $b_word){
                if(str_contains($a_word, $b_word)){
                    $overlap++;
                    break;
                }
            }
        }
        return $overlap;
    }
    
    try{
        $words = explode(" ", strtolower($query));
        $filtered_words = array_filter($words, function($word){
            return !in_array($word, ["and", "the"]);
        });
        if(count($filtered_words) > 0) $words = $filtered_words;
        

        foreach($words as &$word){
            $word = "%" . $word . "%";
        }

        $regions = fetch(
            "SELECT id, title FROM $regions_table WHERE " . str_repeat("LOWER(title) LIKE ? OR ", count($words) - 1) . "LOWER(title) LIKE ?",
            $words
        );
        usort($regions, function($a, $b) use ($query){
            $overlap = getOverlap($b['title'], $query) <=> getOverlap($a['title'], $query);
            if($overlap != 0) return $overlap;
            else return $a['title'] <=> $b['title'];
        });

        $candidates = fetch(
            "SELECT DISTINCT regions.id, regions.title, results.candidate
            FROM $results_table as results
            JOIN $regions_table as regions
            ON regions.id = results.region_id
            WHERE " . str_repeat("LOWER(results.candidate) LIKE ? OR ", count($words) - 1) . "LOWER(results.candidate) LIKE ?",
            $words
        );
        usort($candidates, function($a, $b) use ($query){
            $overlap = getOverlap($b['candidate'], $query) <=> getOverlap($a['candidate'], $query);
            if($overlap != 0) return $overlap;
            else return $a['title'] <=> $b['title'];
        });

        echo json_encode( array( "regions" => $regions, "candidates" => $candidates ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
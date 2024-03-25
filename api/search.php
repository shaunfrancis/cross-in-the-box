<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    $country = $request[0];
    $query = urldecode($request[1]);

    if(!in_array($country, $accepted_countries)) fail();
    $regions_table = $country . "_regions";
    $results_table = $country . "_results";
    
    try{
        $words = explode(" ", strtolower($query));
        foreach($words as &$word){
            $word = "%" . $word . "%";
        }

        $regions = fetch(
            "SELECT id, title FROM $regions_table WHERE " . str_repeat("LOWER(title) LIKE ? OR ", count($words) - 1) . "LOWER(title) LIKE ?",
            $words
        );

        $candidates = fetch(
            "SELECT DISTINCT regions.id, regions.title, results.candidate
            FROM $results_table as results
            JOIN $regions_table as regions
            ON regions.id = results.region_id
            WHERE " . str_repeat("LOWER(results.candidate) LIKE ? OR ", count($words) - 1) . "LOWER(results.candidate) LIKE ?",
            $words
        );

        echo json_encode( array( "regions" => $regions, "candidates" => $candidates ), JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
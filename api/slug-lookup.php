<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    
    $country = $request[0];
    $slug = urldecode($request[1]);

    if(!in_array($country, $accepted_countries)) fail();
    $regions_table = $country . "_regions";
    
    try{
        $regions = fetch(
            "SELECT id, title FROM $regions_table WHERE REPLACE(REGEXP_REPLACE(LOWER(title), '[,()]', ''),' ','-') = :slug",
            [':slug' => $slug]
        );

        if(count($regions) == 0) fail(404, "Not found");
        else echo json_encode($regions[0], JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
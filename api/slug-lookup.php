<?php
    if(count($request) != 2 && count($request) != 3) fail(404, "Not found");

    require_once './functions/fetch.php';
    $slug = urldecode($request[1]);
    if(count($request) == 3) $type = $request[2];

    // First, lowercase the title
    // Then, replace , ( ) ' with empty string
    // Then replace spaces and em dashes with hyphen
    $sql = "SELECT id, title FROM $regions_table WHERE 
        REGEXP_REPLACE(
            REGEXP_REPLACE(LOWER(title), '[,()\\']', ''),
            '[ —]',
            '-'
        ) = :slug";
    $params = [':slug' => $slug];

    if(isset($type)){
        $sql .= " AND type = :type";
        $params[':type'] = $type;
    }
    
    try{
        $regions = fetch( $sql, $params );

        if(count($regions) == 0) fail(404, "Not found");
        else echo json_encode($regions[0], JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>
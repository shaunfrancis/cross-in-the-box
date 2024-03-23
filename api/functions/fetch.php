<?php
    require_once './credentials.php';
    function fetch($sql, $params = []){
        global $pdo;
        $stmt = $pdo -> prepare($sql);
        $success = $stmt -> execute($params);
        if($success){
            $results = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }
        else fail(400, "Bad request");
    }
?>
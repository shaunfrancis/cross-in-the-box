<?php 
    $_title[] = "Papal Conclaves"; 
    $parties = \API\PartiesService::call(["vatican"]) ?? [];
?>
<?php 
    $_title[] = "Papal Conclaves";
    $_description[] = "Browse historical papal conclave results going back to 1963.";
    $parties = \API\PartiesService::call(["vatican"]) ?? [];
?>
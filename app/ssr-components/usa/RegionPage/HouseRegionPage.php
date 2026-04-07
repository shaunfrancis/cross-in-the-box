<?php
namespace USA\RegionPage;

class House extends \USA\RegionPage{
    
    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The district was renamed to " . $currentRegion['title'] . ".",
            "Redistricting occurred."
        );
    }

}
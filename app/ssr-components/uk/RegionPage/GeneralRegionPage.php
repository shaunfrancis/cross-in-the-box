<?php
namespace UK;

class GeneralRegionPage extends RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This constituency was abolished following a boundary review. It was succeeded by:",
            fn($title) => "/uk/general-elections/constituency/" . regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The constituency was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }
}
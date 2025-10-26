<?php
namespace Canada;
include_once './app/lib/canada.php';

class RegionPage extends \Shared\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This riding was abolished following a federal electoral redistribution. It was succeeded by:",
            fn($title) => "/canada/federal-elections/riding/" . \Canada\regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The riding was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }
}
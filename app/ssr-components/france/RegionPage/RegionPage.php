<?php
namespace France;
include_once './app/lib/france.php';

class RegionPage extends \Shared\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This department was abolished. It was succeeded by:",
            fn($title) => "/france/presidential-elections/department/" . \France\regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The department was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }

    static function renderElectionEvent($event, $attributes = NULL, $graphArgs = []){
        parent::renderElectionEvent($event, $attributes, ['subtitles' => [1 => "First round", 2 => "Second round"], ...$graphArgs]);
    }
}
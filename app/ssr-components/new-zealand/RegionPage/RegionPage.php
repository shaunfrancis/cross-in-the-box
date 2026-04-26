<?php
namespace NewZealand;
include_once './app/lib/new-zealand.php';

class RegionPage extends \Shared\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This electorate was abolished following electoral boundary changes. It was succeeded by:",
            fn($title) => "/new-zealand/general-elections/electorate/" . \NewZealand\regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The electorate was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }

    static function renderElectionEvent($event, $attributes = NULL, $graphArgs = []){
        parent::renderElectionEvent(
            $event,
            $attributes,
            ['subtitles' => ["E" => "Electorate vote", "L" => "Party list vote"], ...$graphArgs]
        );
    }
}
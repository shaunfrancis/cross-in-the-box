<?php
namespace USA;

class RegionPage extends \Shared\RegionPage{

    static $dedicatedPages = [
        'P2024' => '/usa/2024-elections',
        'S2024' => '/usa/2024-elections',
        'H2024' => '/usa/2024-elections',
        'G2024' => '/usa/2024-elections'
    ];

    static function renderElectionEvent($event, $attributes = NULL, $graphArgs = []){
        $subtitles = [];
        $subElectionType = "separate";
        switch(getBaseId($event['region']['id'])){
            case "NY": case "CT":
                $subElectionType = "fusion";
                break;
            case "AK": case "ME":
                if($event['region']['id'] !== "GME") $subElectionType = "rounds";
                break;
            case "LA":
                $subtitles = [1 => "Jungle primary", 2 => "Runoff"];
                break;
            default:
                $subtitles = [1 => "First round", 2 => "Runoff"];
                break;
        }

        parent::renderElectionEvent(
            $event,
            $attributes,
            ['subtitles' => $subtitles, 'subElectionType' => $subElectionType, ...$graphArgs]
        );
    }
    
}
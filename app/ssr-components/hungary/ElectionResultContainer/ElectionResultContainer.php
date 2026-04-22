<?php 
namespace Hungary;

class ElectionResultContainer extends \Shared\ElectionResultContainer{
    static $country = "hungary";
    
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?bool $live = NULL,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = NULL
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.65 * (100vh - 250px) )", 'h' => "calc(100vh - 250px)", 'minW' => "425px", 'minH' => "425px"];

        echo parent::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $live, $dedicatedPage, $winFormulaName, $regionsType);
        echo parent::close();
    }

    static function getMapClass(string $election){
        switch($election){
            case "2022": case "2018": case "2014":
                $MapClass = '\Hungary\Maps\Parliamentary2014';
                break;
            case "2026": default:
                $MapClass = '\Hungary\Maps\Parliamentary2026';
        }
        return $MapClass;
    }
}
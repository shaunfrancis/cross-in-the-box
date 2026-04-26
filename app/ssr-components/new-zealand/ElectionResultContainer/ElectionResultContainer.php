<?php 
namespace NewZealand;

class ElectionResultContainer extends \Shared\ElectionResultContainer{
    static $country = "nz";
    
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

        $dimensions = ['w' => "calc(100vh - 100px)", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];

        echo parent::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $live, $dedicatedPage, $winFormulaName, $regionsType);
        echo parent::close();
    }

    static function getMapClass(string $election){
        switch($election){
            case "2023": case "2020": default:
                $MapClass = '\NewZealand\Maps\General2020';
                break;
        }
        return $MapClass;
    }
}
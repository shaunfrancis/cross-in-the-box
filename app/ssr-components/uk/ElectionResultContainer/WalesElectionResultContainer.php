<?php 
namespace UK\ElectionResultContainer;

class Wales extends \UK\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?bool $live = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "wales"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 0.9 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];

        echo parent::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $live, $dedicatedPage, $winFormulaName, $regionsType);
        echo parent::close();
    }

    static function getMapClass(string $election){
        switch($election){
            case "W2021": case "W2016": case "W2011":
                $MapClass = '\UK\Maps\Wales2007';
                break;
            case "W2026": default:
                $MapClass = '\UK\Maps\Wales2026';
        }
        return $MapClass;
    }
}
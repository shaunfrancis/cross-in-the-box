<?php 
namespace USA\ElectionResultContainer;

class House extends \USA\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?bool $live = NULL,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "house"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.2 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];

        echo parent::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $live, $dedicatedPage, $winFormulaName, $regionsType);
        echo parent::close();
    }

    static function getMapClass(string $election){
        switch($election){
            case "H2014": $MapClass = '\USA\Maps\House2014'; break;
            case "H2016": $MapClass = '\USA\Maps\House2016'; break;
            case "H2018": $MapClass = '\USA\Maps\House2018'; break;
            case "H2020": $MapClass = '\USA\Maps\House2020'; break;
            case "H2022": $MapClass = '\USA\Maps\House2022'; break;
            case "H2024": default: $MapClass = '\USA\Maps\House2024';
        }
        return $MapClass;
    }
}
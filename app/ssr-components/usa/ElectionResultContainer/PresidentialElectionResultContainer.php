<?php 
namespace USA\ElectionResultContainer;

class Presidential extends \USA\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "presidential"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.4 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        switch($election){
            case "P2020": case "P2016": case "P2012":
                $MapClass = '\USA\Maps\Presidential2012';
                break;
            case "P2024": default:
                $MapClass = '\USA\Maps\Presidential2024';
                break;
        }
        return $MapClass;
    }
}
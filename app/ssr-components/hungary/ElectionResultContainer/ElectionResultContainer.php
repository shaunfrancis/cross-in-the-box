<?php 
namespace Hungary;

class ElectionResultContainer extends \Shared\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "default"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.65 * (100vh - 250px) )", 'h' => "calc(100vh - 250px)", 'minW' => "425px", 'minH' => "425px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        switch($election){
            case "2022": case "2018": case "2014":
                $MapClass = '\Hungary\Maps\Parliamentary2014';
                break;
        }
        return $MapClass;
    }
}
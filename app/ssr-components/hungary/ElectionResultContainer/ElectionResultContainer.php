<?php 
namespace Hungary;

class ElectionResultContainer extends \Shared\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "default"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.8 * (100vh - 250px) )", 'h' => "calc(100vh - 250px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
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
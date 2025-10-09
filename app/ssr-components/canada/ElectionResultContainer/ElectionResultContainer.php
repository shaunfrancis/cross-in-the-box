<?php 
namespace Canada;

class ElectionResultContainer extends \Shared\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.15 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        switch($election){
            case "2025":
                $MapClass = '\Canada\Maps\Federal2025';
                break;
            case "2021": case "2019": case "2015":
                $MapClass = '\Canada\Maps\Federal2015';
                break;
        }
        return $MapClass;
    }
}
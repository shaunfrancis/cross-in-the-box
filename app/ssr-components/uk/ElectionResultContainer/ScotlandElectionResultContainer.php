<?php 
namespace UK\ElectionResultContainer;

class Scotland extends \UK\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "scotland"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.05 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        switch($election){
            case "S2021": case "S2016": case "S2011": default:
                $MapClass = '\UK\Maps\Scotland2011';
                break;
        }
        return $MapClass;
    }
}
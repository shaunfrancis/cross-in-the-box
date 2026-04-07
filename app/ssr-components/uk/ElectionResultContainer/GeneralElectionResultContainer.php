<?php 
namespace UK\ElectionResultContainer;

class General extends \UK\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "general"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 0.85 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        switch($election){
            case "2019": case "2017": case "2015": case "2010":
                $MapClass = '\UK\Maps\General2010';
                break;
            case "2024": default:
                $MapClass = '\UK\Maps\General2024';
                break;
        }
        return $MapClass;
    }
}
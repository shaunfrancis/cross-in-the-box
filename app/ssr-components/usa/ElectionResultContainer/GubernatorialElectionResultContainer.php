<?php 
namespace USA\ElectionResultContainer;

class Gubernatorial extends \USA\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "gubernatorial"
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 1.4 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        return '\USA\Maps\Gubernatorial1960';
    }
}
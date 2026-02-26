<?php 
namespace USA\ElectionResultContainer;

class Senate extends \USA\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $dataAttrs = [],                     // [{name} => value: any]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "senate"
    ){

        $map = self::getMapClass($dataAttrs['class-no'] ?? 1);

        $dimensions = ['w' => "calc( 1.3 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dataAttrs, $dimensions, $messages, $showChanges, $dedicatedPage, $winFormulaName, $regionsType); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(int $classNo){
        switch($classNo){
            case 3: $MapClass = '\USA\Maps\Senate1960C3'; break;
            case 2: $MapClass = '\USA\Maps\Senate1960C2'; break;
            case 1: default: $MapClass = '\USA\Maps\Senate1960C1';
        }
        return $MapClass;
    }
}
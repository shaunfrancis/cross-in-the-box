<?php 
namespace UK;

class ElectionResultContainer extends \Shared\ElectionResultContainer{
    static function render (
        string $election,
        array $title,                               // [string, string, string]
        ?array $messages = [],                      // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL
    ){

        $map = self::getMapClass($election);

        $dimensions = ['w' => "calc( 0.85 * (100vh - 100px) )", 'h' => "calc(100vh - 100px)", 'minW' => "425px", 'minH' => "500px"];
        ?>

        <?= \Shared\ElectionResultContainer::open($election, $map, $title, $dimensions, $messages, $showChanges, $dedicatedPage); ?>
        <?= \Shared\ElectionResultContainer::close(); ?>
    <?php }

    static function getMapClass(string $election){
        switch($election){
            case "2024":
                $MapClass = '\UK\Maps\General2024';
                break;
            case "2019": case "2017": case "2015": case "2010":
                $MapClass = '\UK\Maps\General2010';
                break;
        }
        return $MapClass;
    }
}
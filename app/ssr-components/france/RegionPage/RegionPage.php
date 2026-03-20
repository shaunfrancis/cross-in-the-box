<?php
namespace France;
include_once './app/lib/france.php';

class RegionPage extends \Shared\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This department was abolished. It was succeeded by:",
            fn($title) => "/france/presidential-elections/department/" . \France\regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The department was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }

    static function renderElectionEvent($event, $attributes = NULL){
        usort($event['data']['results'], function($a, $b){
            if($a['votes'] != $b['votes']) return $b['votes'] - $a['votes'];
            else if(!empty($a['elected'])) return -INF;
            else if(!empty($b['elected'])) return INF;
            else{
                $surname = function($result){
                    $names = explode(" ", $result['candidates'][0]['name']);
                    return end($names);
                };
                return strcmp($surname($a), $surname($b));
            }
        });
        ?>
        <article class="block">
            <h2>
                <?php if(!empty(static::$dedicatedPages[$event['data']['id']])): ?>
                    <a href="<?= static::$dedicatedPages[$event['data']['id']]; ?>" class="arrow-link"><?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?></a>
                <?php else: ?>
                    <?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?>
                <?php endif; ?>
            </h2>
            <?= \Shared\RegionBarGraph::show(
                results: $event['data']['results'],
                subtitles: [1 => "First round", 2 => "Second round"],
                subElectionSort: fn($a, $b) => $b['subid'] - $a['subid']
            ); ?>
        </article>
    <?php }
}
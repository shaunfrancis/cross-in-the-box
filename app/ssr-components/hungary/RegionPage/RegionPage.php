<?php
namespace Hungary;
include_once './app/lib/hungary.php';

class RegionPage extends \Shared\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This constituency was abolished following a electoral boundary changes. It was succeeded by:",
            fn($title) => "/hungary/parliamentary-elections/constituency/" . \Hungary\regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The constituency was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }

    static function renderElectionEvent($event, $attributes = NULL){
        $results = $event['data']['results'];
        $hasMultipleCandidates = array_find($results, fn($result) => count($result['candidates']) > 1);
        if(!$hasMultipleCandidates) return parent::renderElectionEvent($event, $attributes);

        usort($results, function($a, $b){ return $b['votes'] - $a['votes']; });
        ?>

        <article class="block">
            <h2><?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?></h2>
            <?= \Shared\CandidatesMasonryList::render(results: $results, limit: 5); ?>
            <h3>Votes</h3>
            <?= \Shared\RegionBarGraph::render($results, withoutCandidateNames: true); ?>
        </article>

    <?php }
}
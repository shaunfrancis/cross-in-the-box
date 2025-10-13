<?php
namespace UK;
include_once './app/lib/shared.php';

class ScotlandRegionPage extends RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This constituency was abolished following a boundary review. It was succeeded by:",
            fn($title) => "/uk/general-elections/constituency/" . regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The constituency was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }

    static function renderElectionEvent($event){
        $multiCandidateData = \Shared\combineMultiCandidateResults($event['data']['results']);
        if(!$multiCandidateData['isMultipleCandidates']) return parent::renderElectionEvent($event);

        $results = $multiCandidateData['results'];
        usort($results, function($a, $b){ return $b['votes'] - $a['votes']; });
        ?>

        <article class="block">
            <?= DHondtTable::render(
                $event['data']['title'],
                $results
            ); ?>
        </article>

    <?php }
}
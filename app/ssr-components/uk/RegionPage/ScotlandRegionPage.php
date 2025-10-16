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

    static function renderElectionEvent($event, $attributes = NULL){
        $results = $event['data']['results'];
        $hasMultipleCandidates = array_find($results, fn($result) => count($result['candidates']) > 1);
        if(!$hasMultipleCandidates) return parent::renderElectionEvent($event, $attributes);

        usort($results, function($a, $b){ return $b['votes'] - $a['votes']; });

        $constituency_relationship = array_find($attributes ?? [], fn($attribute) => $attribute['label'] === "constituency_relationship");
        if(!empty($constituency_relationship)){
            $constituency_results = \API\RelationshipService::call(
                ["uk", $constituency_relationship['value']],
                ['election' => $event['data']['id']]
            );
            
            $divisors = [];
            foreach($constituency_results as $result){
                if($result['election'] != $event['data']['id'] || !$result['elected'] || $result['party'] == "ind") continue;
                if(empty($divisors[$result['party']])) $divisors[$result['party']] = 1;
                else $divisors[$result['party']]++;
            }
        }
        ?>

        <article class="block">
            <h2><?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?></h2>
            <?= \Shared\CandidatesMasonryList::render($results); ?>
            <h3>Votes</h3>
            <?= DHondtTable::render($results, $divisors); ?>
        </article>

    <?php }
}
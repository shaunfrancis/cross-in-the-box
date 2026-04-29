<?php
namespace NewZealand;
include_once './app/lib/new-zealand.php';

class RegionPage extends \Shared\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This electorate was abolished following electoral boundary changes. It was succeeded by:",
            fn($title) => "/new-zealand/general-elections/electorate/" . \NewZealand\regionToSlug($title)
        );

    }

    static function renderTreeChangeNote(array $event, array $currentRegion, array $data, ?callable $renameLink = NULL, string $changesLabel = ""){
        parent::renderTreeChangeNote($event, $currentRegion, $data,
            fn($region) => "The electorate was renamed to " . $currentRegion['title'] . ".",
            "Boundary changes occurred."
        );
    }

    static function renderElectionEvent($event, $attributes = NULL, $graphArgs = []){
        if($event['region']['id'] !== "LIST") return parent::renderElectionEvent(
            $event,
            $attributes,
            ['subtitles' => ["E" => "Electorate vote", "L" => "Party list vote"], ...$graphArgs]
        );


        $party_list_totals = [];
        $divisors = [];

        $electorate_results = \API\ResultsService::call( ["nz", $event['data']['id']] );
        foreach($electorate_results as $result){
            if($result['subid'] === "L"){
                $party_list_totals[$result['party']] = ($party_list_totals[$result['party']] ?? 0) + $result['votes'];
            }
            if($result['subid'] === "E"){
                if(!empty($result['candidates'][0]['elected'])) $divisors[$result['party']] = ($divisors[$result['party']] ?? 0) + 1;
            }
        }
        unset($result);

        $results = $event['data']['results'];
        foreach($results as &$result){
            if(!empty($party_list_totals[$result['party']])) $result['votes'] = $party_list_totals[$result['party']];
        }
        usort($results, function($a, $b){ return $b['votes'] - $a['votes']; });
        ?>

        <article class="block">
            <h2>
                <?php if(!empty(static::$dedicatedPages[$event['data']['id']])): ?>
                    <a href="<?= static::$dedicatedPages[$event['data']['id']]; ?>" class="arrow-link"><?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?></a>
                <?php else: ?>
                    <?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?>
                <?php endif; ?>
            </h2>
            <?= \Shared\CandidatesMasonryList::render($results); ?>
            <h3>Votes</h3>
            <dl class="key-information">
                <div>
                    <dd>Quota:</dd>
                    <dt>5% or at least one electorate seat</dt>
                </div>
            </dl>
            <?= \Shared\SainteLagueTable::render($results, $divisors ?? [], quota: function($r) use ($divisors){
                return $r['percentage'] > 5 || !empty($divisors[$r['party']]);
            }); ?>
        </article>

    <?php }
}
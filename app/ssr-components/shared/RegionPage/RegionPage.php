<?php
namespace Shared;
include_once './app/lib/shared.php';

class RegionPage extends \Base\Component{

    static $dedicatedPages = [];
    
    static function render(
        array $data,    // region data obtained by call to RegionService
    ){
            foreach($data['events'] as $index => $event){

                /* Successors for abolished regions */
                if($index === 0){
                    static::renderSuccessorLinks($event, $data); ?>
                    <section id="election-results">
                <?php }

                if(empty($currentRegion)) $currentRegion = $event['region']; // First event, show title and set region
                
                elseif($event['region']['id'] != $currentRegion['id']){ // Find note explaining change from tree
                    static::renderTreeChangeNote($event, $currentRegion, $data);
                    $currentRegion = $event['region'];
                }

                switch($event['type']){
                    case "election":
                        static::renderElectionEvent($event, $data['attributes']);
                        break;
                    case "update":
                        static::renderUpdateEvent($event, $data['attributes']);
                        break;
                }

            }
        ?>
        </section>
    <?php }

    static function renderSuccessorLinks(
        array $event,                                                                 // specific event data
        array $data,                                                                  // region data obtained by call to RegionService
        string $abolishedLabel = "This region was abolished. It was succeeded by:",   // label for abolished container
        ?callable $regionLink = NULL,                                                 // function for computing region link from region id
    ){
        $branches = array_filter($data['tree'], function($branch) use ($event){
            return $branch['region_id'] == $event['region']['id'] && !$branch['direct_successor'];
        });

        if(!empty($branches)): ?>

            <section class="RegionPage__abolished-container shaded yellow">
                <h2><?= $abolishedLabel; ?></h2>
                <div class="RegionPage__abolished-links-container">
                    <?php foreach($branches as $branch): ?>
                        <a href="<?= !empty($regionLink) ? $regionLink($branch['title']) : "#"; ?>" class="unstyled">
                            <h3><?= $branch['title']; ?></h3>
                        </a>
                    <?php endforeach; ?>
                </div>
            </section>
        
        <?php endif;
    }

    static function renderTreeChangeNote(
        array $event, 
        array $currentRegion,
        array $data,
        ?callable $renameLabel = NULL,                           // label for renamed region (as function expecting $region)
        string $changesLabel = "Boundary changes occurred."      // label for redistricted region
    ){
        $treeLink = array_find($data['tree'], function($branch) use ($currentRegion, $event){
            return $branch['region_id'] == $event['region']['id'] && $branch['successor_id'] == $currentRegion['id'];
        });
        
        if($treeLink):
            $note = "";
            if($event['region']['title'] != $currentRegion['title']){
                $note .= !empty($renameLabel) ? $renameLabel($currentRegion) : "Renamed to " . $currentRegion['title'] . ".";
            }
            else $note .= $changesLabel; ?>

            <article class="RegionPage__boundary-change-note"><?= $note; ?> <?= $treeLink['note']; ?></article>

        <?php
        else : ?>

            <article class="RegionPage__boundary-change-note"><?= $changesLabel; ?></article>

        <?php endif;

        if($event['region']['title'] != $currentRegion['title']): ?>
            <h1><?= $event['region']['title']; ?></h1>
        <?php endif;
    }

    static function renderElectionEvent($event, $attributes = NULL, $graphArgs = []){
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

        $counted = array_find($attributes ?? [], fn($attr) => $attr['label'] == "counted" && $attr['applies_to'] == $event['data']['id']);
        $graph_note = array_find($attributes ?? [], fn($attr) => $attr['label'] == "graph_note" && $attr['applies_to'] == $event['data']['id']);
        ?>
        <article class="block">
            <h2>
                <?php if(!empty(static::$dedicatedPages[$event['data']['id']])): ?>
                    <a href="<?= static::$dedicatedPages[$event['data']['id']]; ?>" class="arrow-link"><?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?></a>
                <?php else: ?>
                    <?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?>
                <?php endif; ?>
            </h2>
            <?php if(!empty($counted)){
                if(floatval($counted['value'] ?? 0) >= 100) : ?><span>Estimated >99% counted</span>
                <?php elseif(floatval($counted['value'] ?? 0) > 0): ?><span>Estimated <?= $counted['value']; ?>% counted</span>
                <?php endif;
            } ?>
            <?php if(!empty($graph_note)) : ?>
                <span><?= $graph_note['value']; ?></span>
            <?php endif; ?>
            <?= RegionBarGraph::show(
                results: $event['data']['results'],
                subtitles: $graphArgs['subtitles'] ?? [],
                subElectionType: $graphArgs['subElectionType'] ?? "separate"
            ); ?>
        </article>
    <?php }

    static function renderUpdateEvent($event, $attributes = NULL){ ?>
        <article class="RegionPage__update-note">

            <div class="RegionPage__party-bloc" data-party="<?= $event['data']['party']; ?>">
                <?= $event['data']['party']; ?>
            </div>
            <h2><?= dateToLongDate( $event['date'] ); ?></h2>
            <span><?= $event['data']['note']; ?></span>

        </article>
    <?php }
    
}
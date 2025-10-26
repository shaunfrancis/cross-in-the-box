<?php
namespace UK\RegionPage;

class NI extends \UK\RegionPage{
    static function renderSuccessorLinks(array $event, array $data, string $abolishedLabel = "", ?callable $regionLink = NULL){
        
        parent::renderSuccessorLinks($event, $data, 
            "This constituency was abolished following a boundary review. It was succeeded by:",
            fn($title) => "/uk/northern-ireland-assembly/constituency/" . \UK\regionToSlug($title)
        );

    }

    static function renderElectionEvent($event, $attributes = NULL){
        $results = $event['data']['results'];  ?>

        <article class="block">
            <h2><?= str_replace("- ", "-", implode(" ", $event['data']['title'])); ?></h2>
            <?= \Shared\STVTable::render($results); ?>
        </article>

    <?php }
}
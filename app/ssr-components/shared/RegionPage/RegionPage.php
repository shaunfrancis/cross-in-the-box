<?php
namespace Shared;

class RegionPage extends \Base\Component{
    
    static function render(
        array $data,                                                                  // region data obtained by call to RegionService
        string $abolishedLabel = "This region was abolished. It was succeeded by:",   // label for abolished container
        callable $regionLink = NULL,                                                  // function for computing region link from region id
    ){
            foreach($data['events'] as $index => $event){

                /* Successors for abolished regions */
                if($index === 0){
                    $branches = array_filter($data['tree'], function($branch) use ($event){
                        return $branch['region_id'] == $event['region']['id'] && !$branch['direct_successor'];
                    });

                    if(!empty($branches)): ?>

                        <section class="RegionPage__abolished-container shaded yellow">
                            <h2><?= $abolishedLabel; ?></h2>
                            <div class="RegionPage__abolished-links-container">
                                <?php foreach($branches as $branch): ?>
                                    <a href="<?= !empty($regionLink) ? $regionLink() : "#"; ?>" class="unstyled">
                                        <h3><?= $branch['title']; ?></h3>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </section>
                    
                    <?php endif; ?>
                    
                    <section>
                    
                <?php }

                if(empty($currentRegion)) $currentRegion = $event['region']; // First event, show title and set region
                
                elseif($event['region']['id'] != $currentRegion['id']){ // Find note explaining change from tree
                    $treeLink = array_find($data['tree'], function($branch) use ($currentRegion, $event){
                        return $branch['region_id'] == $event['region']['id'] && $branch['successor_id'] == $currentRegion['id'];
                    });
                    
                    if($treeLink):
                        $note = "";
                        if($event['region']['title'] != $currentRegion['title']) $note .= "The constituency was renamed to " . $currentRegion['title'] . ".";
                        else $note .= "Boundary changes occurred."; ?>

                        <article class="RegionPage__boundary-change-note"><?= $note; ?> <?= $treeLink['note']; ?></article>

                    <?php
                    else : ?>

                        <article class="RegionPage__boundary-change-note">Boundary changes.</article>

                    <?php endif;

                    if($event['region']['title'] != $currentRegion['title']): ?>
                        <h1><?= $event['region']['title']; ?></h1>
                    <?php endif;

                    $currentRegion = $event['region'];
                }

                switch($event['type']){
                    case "election":
                        // usort($event['data']['results'], function($a, $b){
                        //     return 
                        // });
                        echo RegionBarGraph::show(
                            $event['data']['title'],
                            $event['data']['results']
                        );

                        break;
                    case "update": ?>
                        <article class="RegionPage__update-note">

                            <div class="RegionPage__party-bloc" <?php /*style={{background:party.color, color:party.textColor}}*/ ?>>
                                {party.displayId}
                            </div>
                            <h2>{dateToLongDate(castEvent.date)}</h2>
                            <span><?= $event['data']['note']; ?></span>

                        </article>
                        <?php break;
                }

            }
        ?>
        </section>
    <?php }
    
}


/*
    const eventNodes : React.ReactNode[] = [];
    const succeededByNodes : React.ReactNode[] = [];

    let currentRegion : Region;
    data.events.forEach( (event, index) => {
        abolished link: <Link href={'/uk/general-elections/constituency/' + constituencyToSlug(treeBranch.title)} className={styles["abolished-link"] + " unstyled"}>


        switch(event.type){
            case "election": {
                let castEvent = event as ElectionEvent;
                castEvent.data.results.sort(orderResults);
                eventNodes.push(
                    <RegionBarGraph key={index} title={castEvent.data.title} results={castEvent.data.results} parties={data.parties} />
                );
                break;
            }
            case "update": {
                let castEvent = event as UpdateEvent;
                const party = data.parties.find( p => p.id == castEvent.data.party ) || DefaultParty;
                eventNodes.push(
                    <article className={styles["update-note"]} key={index}>

                        <div className={styles["party-bloc"]} style={{background:party.color, color:party.textColor}}>
                            {party.displayId}
                        </div>
                        <h2>{dateToLongDate(castEvent.date)}</h2>
                        <span>{castEvent.data.note}</span>

                    </article>
                );
                break;
            }
        }
    });
    */
<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "" ],
    ];
?>

<section id="hero">
    <a href="/uk/general-elections/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>UK General Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?= HeroNav::show($heroNavItems); ?>
</section>

<!--
        <RegionPage sidebar={<UKConstituencySidebar region={region} />}>

            {succeededByNodes.length > 0 &&
                <section id={styles["abolished-container"]} className="shaded yellow">
                    <h2>This constituency was abolished following a boundary review. It was succeeded by:</h2>
                    <div id={styles["abolished-links-container"]}>
                        {succeededByNodes}
                    </div>
                </section>
            }

            <section ref={heroNavItems[0].ref}>
                {eventNodes}
            </section>

            {/* 
            <section ref={heroNavItems[1].ref} id={styles["heading-section"]}>
                <article className={styles["widget-container"]}>
                    <UKTernaryPlot highlightChanges={false} parties={data.parties} resultSets={
                        ( () => { 
                            const sets : AnonymousResult[][] = [];
                            data.events.filter(e => e.type == "election").forEach( event => {

                                let votes = 0;
                                (event as ElectionEvent).data.results.forEach( result => {
                                    votes += result.votes;
                                });
                                if(votes == 0) return;

                                sets.push((event as ElectionEvent).data.results);
                            }) 
                            return sets.reverse();
                        } )()
                    } />
                </article>
            </section>
            */}
            
        </RegionPage>-->
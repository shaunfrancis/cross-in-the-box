<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/france-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a department", 'src' => "/images/nav-region.svg", 'id' => "find-a-department", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Presidential Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/france-cartographic-icon.svg",
                to: "/images/france-geographic-icon.svg",
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2022",
                title: ["2022", "Presidential", "Election"]
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-department" class="shaded purple">
        <h1>Find a department</h1>
        <?= \France\RegionSearchSection::show(); ?>
    </section>

</main>
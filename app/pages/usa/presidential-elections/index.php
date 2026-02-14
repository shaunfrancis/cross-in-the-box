<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/usa-nav-presidential-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a state", 'src' => "/images/nav-region.svg", 'id' => "find-a-state", 'focus' => ".RegionSearchSection__search-input" ],
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
                from: "/images/usa-cartographic-presidential-icon.svg",
                to: "/images/usa-geographic-icon.svg",
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2024",
                title: ["2024", "Presidential", "Election"],
                messages: ['group' => "2024", 'open' => TRUE]
            ); ?>

            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2020",
                title: ["2020", "Presidential", "Election"],
                messages: ['group' => "2020"]
            ); ?>

            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2016",
                title: ["2016", "Presidential", "Election"],
                messages: ['group' => "P2016"]
            ); ?>

            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2012",
                title: ["2012", "Presidential", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-state" class="shaded purple">
        <h1>Find a state</h1>
        <?= \USA\RegionSearchSection::show("presidential"); ?>
    </section>

</main>
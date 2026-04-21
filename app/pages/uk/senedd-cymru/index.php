<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/uk-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a constituency", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Senedd Cymru Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?php /*<?= Toggle::show(
                $id = "map-type",
                $from = "/images/uk-cartographic-icon.svg",
                $to = "/images/uk-geographic-icon.svg",
            ) ?>*/ ?>
        </div>
        <?= ElectionResultsSection::open(); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2026",
                title: ["2026", "Senedd Cymru", "Election"],
                messages: ['group' => "SW2026", 'open' => TRUE]
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2021",
                title: ["2021", "Senedd Cymru", "Election"],
                messages: ['group' => "SW2021"]
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2016",
                title: ["2016", "Welsh Assembly", "Election"]
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2011",
                title: ["2011", "Welsh Assembly", "Election"]
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show("wales"); ?>
    </section>

</main>
<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/uk-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a constituency or region", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Scottish Parliament Elections</h1>
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
            <?= \UK\ScotlandElectionResultContainer::show(
                election: "S2021",
                title: ["2021", "Scottish Parliament", "Election"],
                messages: ['group' => "SW2021", 'open' => TRUE]
            ); ?>

            <?= \UK\ScotlandElectionResultContainer::show(
                election: "S2016",
                title: ["2016", "Scottish Parliament", "Election"]
            ); ?>

            <?= \UK\ScotlandElectionResultContainer::show(
                election: "S2011",
                title: ["2011", "Scottish Parliament", "Election"]
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency or region</h1>
        <?= \UK\RegionSearchSection::show("scotland"); ?>
    </section>

</main>
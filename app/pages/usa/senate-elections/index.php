<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/usa-nav-senate-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a state", 'src' => "/images/nav-region.svg", 'id' => "find-a-state", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Senate Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/usa-cartographic-senate-icon.svg",
                to: "/images/usa-geographic-icon.svg",
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2024",
                dataAttrs: ['class-no' => 1],
                title: ["2024", "Senate", "Election"],
                messages: ['group' => "2024", 'open' => TRUE],
                dedicatedPage: '/usa/2024-elections'
            ); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2022",
                dataAttrs: ['class-no' => 3],
                title: ["2022", "Senate", "Election"]
            ); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2020",
                dataAttrs: ['class-no' => 2],
                title: ["2020", "Senate", "Election"],
                messages: ['group' => "2020"]
            ); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2018",
                dataAttrs: ['class-no' => 1],
                title: ["2018", "Senate", "Election"],
                messages: ['group' => "2018"]
            ); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2016",
                dataAttrs: ['class-no' => 3],
                title: ["2016", "Senate", "Election"]
            ); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2014",
                dataAttrs: ['class-no' => 2],
                title: ["2014", "Senate", "Election"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-state" class="shaded purple">
        <h1>Find a state</h1>
        <?= \USA\RegionSearchSection::show("senate"); ?>
    </section>

</main>
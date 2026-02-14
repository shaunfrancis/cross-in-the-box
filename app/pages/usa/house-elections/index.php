<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/usa-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a state", 'src' => "/images/nav-region.svg", 'id' => "find-a-district", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>House Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/usa-cartographic-icon.svg",
                to: "/images/usa-geographic-icon.svg",
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2024",
                title: ["2024", "House", "Election"],
                messages: ['group' => "2024", 'open' => TRUE]
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2022",
                title: ["2022", "House", "Election"],
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2020",
                title: ["2020", "House", "Election"],
                messages: ['group' => "2020"]
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2018",
                title: ["2018", "House", "Election"],
                messages: ['group' => "2018"]
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2016",
                title: ["2016", "House", "Election"],
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2014",
                title: ["2014", "House", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-district" class="shaded purple">
        <h1>Find a district</h1>
        <?= \USA\RegionSearchSection::show("house"); ?>
    </section>

</main>
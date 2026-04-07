<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/usa-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a state", 'src' => "/images/nav-region.svg", 'id' => "find-a-state", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Gubernatorial Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/usa-cartographic-icon.svg",
                to: "/images/usa-geographic-icon.svg",
                ariaLabels: ['off' => 'Cartographic maps', 'on' => 'Geographic maps', 'toggle' => 'Switch map style']
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2025",
                title: ["2025", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2024",
                title: ["2024", "Gubernatorial", "Elections"],
                messages: ['group' => "2024"],
                dedicatedPage: '/usa/2024-elections'
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2023",
                title: ["2023", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2022",
                title: ["2022", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2021",
                title: ["2021", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2020",
                title: ["2020", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2019",
                title: ["2019", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2018",
                title: ["2018", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2017",
                title: ["2017", "Gubernatorial", "Elections"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2016",
                title: ["2016", "Gubernatorial", "Elections"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-state" class="shaded purple">
        <h1>Find a state</h1>
        <?= \USA\RegionSearchSection::show("gubernatorial"); ?>
    </section>

</main>
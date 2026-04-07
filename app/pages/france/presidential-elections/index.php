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
                ariaLabels: ['off' => 'Cartographic maps', 'on' => 'Geographic maps', 'toggle' => 'Switch map style']
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2022",
                dataAttrs: ['round' => 2],
                title: ["2022", "Second", "Round"],
                messages: ['group' => "2022-2", 'open' => TRUE]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2022",
                dataAttrs: ['round' => 1],
                title: ["2022", "First", "Round"],
                messages: ['group' => "2022-1"]
            ); ?>

            <?= \France\ElectionResultContainer::show(
                election: "2017",
                dataAttrs: ['round' => 2],
                title: ["2017", "Second", "Round"],
                messages: ['group' => "2017-2"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2017",
                dataAttrs: ['round' => 1],
                title: ["2017", "First", "Round"],
                messages: ['group' => "2017-1"]
            ); ?>

            <?= \France\ElectionResultContainer::show(
                election: "2012",
                dataAttrs: ['round' => 2],
                title: ["2012", "Second", "Round"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2012",
                dataAttrs: ['round' => 1],
                title: ["2012", "First", "Round"]
            ); ?>

            <?= \France\ElectionResultContainer::show(
                election: "2007",
                dataAttrs: ['round' => 2],
                title: ["2007", "Second", "Round"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2007",
                dataAttrs: ['round' => 1],
                title: ["2007", "First", "Round"]
            ); ?>

            <?= \France\ElectionResultContainer::show(
                election: "2002",
                dataAttrs: ['round' => 2],
                title: ["2002", "Second", "Round"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2002",
                dataAttrs: ['round' => 1],
                title: ["2002", "First", "Round"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-department" class="shaded purple">
        <h1>Find a department</h1>
        <?= \France\RegionSearchSection::show(); ?>
    </section>

</main>
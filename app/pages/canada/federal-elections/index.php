<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/canada-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a riding", 'src' => "/images/nav-region.svg", 'id' => "find-a-riding", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Federal Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/canada-cartographic-icon.svg",
                to: "/images/canada-geographic-icon.svg",
                ariaLabels: ['off' => 'Cartographic maps', 'on' => 'Geographic maps', 'toggle' => 'Switch map style']
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>
            <?= \Canada\ElectionResultContainer::show(
                election: "2025",
                title: ["2025", "Federal", "Election"]
            ); ?>

            <?= \Canada\ElectionResultContainer::show(
                election: "2021",
                title: ["2021", "Federal", "Election"]
            ); ?>

            <?= \Canada\ElectionResultContainer::show(
                election: "2019",
                title: ["2019", "Federal", "Election"]
            ); ?>

            <?= \Canada\ElectionResultContainer::show(
                election: "2015",
                title: ["2015", "Federal", "Election"]
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-riding" class="shaded purple">
        <h1>Find a riding</h1>
        <?= \Canada\RegionSearchSection::show(); ?>
    </section>

</main>
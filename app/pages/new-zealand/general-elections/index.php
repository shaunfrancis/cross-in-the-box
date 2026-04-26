<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/nz-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find an electorate", 'src' => "/images/nav-region.svg", 'id' => "find-an-electorate", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>General Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/nz-cartographic-icon.svg",
                to: "/images/nz-geographic-icon.svg",
                ariaLabels: ['off' => 'Cartographic maps', 'on' => 'Geographic maps', 'toggle' => 'Switch map style']
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \NewZealand\ElectionResultContainer::show(
                election: "2023",
                title: ["2023", "General", "Election"]
            ); ?>

            <?= \NewZealand\ElectionResultContainer::show(
                election: "2020",
                title: ["2020", "General", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-an-electorate" class="shaded purple">
        <h1>Find an electorate</h1>
        <?= \NewZealand\RegionSearchSection::show(); ?>
    </section>

</main>
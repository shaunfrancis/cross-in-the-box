<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/usa-nav-presidential-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a state", 'src' => "/images/nav-region.svg", 'id' => "find-a-state", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>2026 elections</h1>
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

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2026",
                dataAttrs: ['class-no' => 2],
                title: ["Senate"],
                messages: ['group' => "2026", 'open' => TRUE]
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2026",
                title: ["House"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2026",
                title: ["Governors"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-state" class="shaded purple">
        <h1>Find a state</h1>
        <?= \USA\RegionSearchSection::show(); ?>
    </section>

</main>
<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/usa-nav-presidential-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a state", 'src' => "/images/nav-region.svg", 'id' => "find-a-state", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>2024 elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/usa-cartographic-presidential-icon.svg",
                to: "/images/usa-geographic-icon.svg",
                ariaLabels: ['off' => 'Cartographic maps', 'on' => 'Geographic maps', 'toggle' => 'Switch map style']
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2024",
                title: ["President"],
                messages: ['group' => "2024", 'open' => TRUE]
            ); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2024",
                dataAttrs: ['class-no' => 1],
                title: ["Senate"]
            ); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2024",
                title: ["House"]
            ); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2024",
                title: ["Governors"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-state" class="shaded purple">
        <h1>Find a state</h1>
        <?= \USA\RegionSearchSection::show(); ?>
    </section>

</main>
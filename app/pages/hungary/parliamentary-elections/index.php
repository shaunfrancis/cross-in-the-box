<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/hungary-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a constituency", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Hungarian Parliamentary Elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?php/*= Toggle::show(
                id: "map-type",
                from: "/images/hungary-cartographic-icon.svg",
                to: "/images/hungary-geographic-icon.svg",
            ) */?>
        </div>
        <?= ElectionResultsSection::open(); ?>
            <?= \Hungary\ElectionResultContainer::show(
                election: "2022",
                title: ["2022", "Parliamentary", "Election"]
            ); ?>

            <?= \Hungary\ElectionResultContainer::show(
                election: "2022",
                title: ["2018", "Parliamentary", "Election"],
            ); ?>

            <?= \Hungary\ElectionResultContainer::show(
                election: "2014",
                title: ["2014", "Parliamentary", "Election"],
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \Hungary\RegionSearchSection::show(); ?>
    </section>

</main>
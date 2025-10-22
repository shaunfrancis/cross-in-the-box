<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/uk-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a constituency", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency", 'focus' => ".RegionSearchSection__search-input" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Northern Ireland Assembly Elections</h1>
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
            <?= \UK\ElectionResultContainer\NI::show(
                election: "N2022",
                title: ["2022", "NI Assembly", "Election"]
            ); ?>
            <?= \UK\ElectionResultContainer\NI::show(
                election: "W2021",
                title: ["2017", "NI Assembly", "Election"]
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show("ni"); ?>
    </section>

</main>
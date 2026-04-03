<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/uk-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a constituency", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency", 'focus' => ".RegionSearchSection__search-input" ],
        [ 'title' => "Opinion polling", 'src' => "/images/nav-polling.svg", 'id' => "opinion-polling" ]
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
                from: "/images/uk-cartographic-icon.svg",
                to: "/images/uk-geographic-icon.svg",
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["Today"],
                showChanges: TRUE,
                messages: ['group' => "2024U", 'open' => TRUE]
            ); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["2024", "General", "Election"],
                messages: ['group' => "2024"],
                // dedicatedPage: '/uk/general-elections/2024'
            ); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2019",
                title: ["2019", "General", "Election"],
                messages: ['group' => "2019"]
            ); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2017",
                title: ["2017", "General", "Election"],
                messages: ['group' => "2017"]
            ); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2015",
                title: ["2015", "General", "Election"],
            ); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2010",
                title: ["2010", "General", "Election"],
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show("general"); ?>
    </section>
            
    <section id="opinion-polling">
        <h1>
            <a href="general-elections/polling" class="arrow-link">Opinion polling</a>
        </h1>
        <?= PollingSection::show(); ?>
    </section>

</main>
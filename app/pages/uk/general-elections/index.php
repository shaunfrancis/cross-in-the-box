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
        <h1>UK General Elections</h1>
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
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2024",
                title: ["2024", "General", "Election"],
                messages: ['group' => "2024", 'open' => TRUE]
            ); ?>

            <?= \UK\GeneralElectionResultContainer::show(
                election: "2019",
                title: ["2019", "General", "Election"],
                messages: ['group' => "2019"]
            ); ?>

            <?= \UK\GeneralElectionResultContainer::show(
                election: "2017",
                title: ["2017", "General", "Election"],
                messages: ['group' => "2017"]
            ); ?>

            <?= \UK\GeneralElectionResultContainer::show(
                election: "2015",
                title: ["2015", "General", "Election"],
            ); ?>

            <?= \UK\GeneralElectionResultContainer::show(
                election: "2010",
                title: ["2010", "General", "Election"],
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show("general"); ?>
        <!--<UKConstituencySearchSection searchInputRef={searchInputRef} />-->
    </section>
            
    <section id="opinion-polling">
        <h1>
            <a href="polling" class="heading-link">
                <span>Opinion polling</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
            </a>
        </h1>
        <!--<UKPollingSection parties={parties} />-->
    </section>
    
    <section>
        <div class="section-heading">
            <h1>Analysis</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/uk-cartographic-icon.svg",
                to: "/images/uk-geographic-icon.svg",
            ) ?>
        </div>

        <?= ElectionResultsSection::open(); ?>
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2024",
                title: ["2024", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2024",
                title: ["2024", "results with", "Con and Ref combined"],
                winFormulaName: "con-ref-combined"
            ); ?>
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2019",
                title: ["2019", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2017",
                title: ["2017", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2015",
                title: ["2015", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\GeneralElectionResultContainer::show(
                election: "2010",
                title: ["2010", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
        <?= ElectionResultsSection::close(); ?>

        <!-- <UKAnalysisSection regions={regions} parties={parties} geographic={geographic} /> -->
    </section>
            
    <!--<UKMapDefs />-->

</main>
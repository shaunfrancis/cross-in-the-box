<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election result", 'src' => "/images/uk-nav-results.svg", 'id' => "election-result" ],
        [ 'title' => "Find a constituency", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency", 'focus' => ".RegionSearchSection__search-input" ],
        [ 'title' => "Analysis", 'src' => "/images/nav-analysis.svg", 'id' => "analysis" ],
        [ 'title' => "Opinion polling", 'src' => "/images/nav-polling.svg", 'id' => "opinion-polling" ]
    ];
?>
<main>
    <section id="hero">
        <a href="/uk/general-elections/" class="breadcrumb">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>General Elections</span>
        </a>

        <h1>2024 General Election</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-result">
        <div class="section-heading">
            <h1>Election result</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/uk-cartographic-icon.svg",
                to: "/images/uk-geographic-icon.svg",
            ) ?>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["2024", "General", "Election"],
                messages: ['group' => "2024", 'open' => TRUE]
            ); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["Today"],
                showChanges: TRUE,
                messages: ['group' => "2024U"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show("general"); ?>
    </section>

    <section id="analysis">
        <div class="section-heading">
            <h1>Analysis</h1>
            <?= Toggle::show(
                id: "map-type",
                from: "/images/uk-cartographic-icon.svg",
                to: "/images/uk-geographic-icon.svg",
            ) ?>
        </div>

        <?= ElectionResultsSection::open(); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["2024", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["2024", "results with", "Con and Ref combined"],
                winFormulaName: "con-ref-combined"
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2019",
                title: ["2019", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2017",
                title: ["2017", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2015",
                title: ["2015", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2010",
                title: ["2010", "parties in", "second place"],
                winFormulaName: "second-place"
            ); ?>
        <?= ElectionResultsSection::close(); ?>
    </section>
            
    <section id="opinion-polling">
        <h1>
            <a href="general-elections/polling" class="arrow-link">Opinion polling</a>
        </h1>
        <!--<UKPollingSection parties={parties} />-->
    </section>

</main>
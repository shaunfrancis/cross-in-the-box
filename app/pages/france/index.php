<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/france-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>French elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>France holds a <a href="/france/presidential-elections">presidential election</a> every five years to elect its head of state. If no candidate receives a majority of votes in the first round, the top two candidates proceed to a second round held two weeks later.</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/france/presidential-elections">Presidential Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \France\ElectionResultContainer::show(
                election: "2022",
                dataAttrs: ['round' => 2],
                title: ["2022", "Presidential", "Election"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2017",
                dataAttrs: ['round' => 2],
                title: ["2017", "Presidential", "Election"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2012",
                dataAttrs: ['round' => 2],
                title: ["2012", "Presidential", "Election"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2007",
                dataAttrs: ['round' => 2],
                title: ["2007", "Presidential", "Election"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2002",
                dataAttrs: ['round' => 2],
                title: ["2002", "Presidential", "Election"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
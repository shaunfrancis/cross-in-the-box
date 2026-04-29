<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/hungary-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Hungarian elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>Hungary holds a <a href="/hungary/parliamentary-elections">parliamentary election</a> at least once every four years to elect 199 members to its unicameral parliament, the Országgyűlés (National Assembly).</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/hungary/parliamentary-elections">Parliamentary Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \Hungary\ElectionResultContainer::show(
                election: "2026",
                title: ["2026", "Parliamentary", "Election"],
            ); ?>
            <?= \Hungary\ElectionResultContainer::show(
                election: "2022",
                title: ["2022", "Parliamentary", "Election"],
            ); ?>
            <?= \Hungary\ElectionResultContainer::show(
                election: "2018",
                title: ["2018", "Parliamentary", "Election"],
            ); ?>
            <?= \Hungary\ElectionResultContainer::show(
                election: "2014",
                title: ["2014", "Parliamentary", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
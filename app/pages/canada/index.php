<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/canada-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Canadian elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>Canada holds a <a href="/canada/federal-elections">federal election</a> at least once every four years to elect 343 members to its lower house.</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/canada/federal-elections">Federal Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \Canada\ElectionResultContainer::show(
                election: "2025",
                title: ["2025", "Federal", "Election"],
            ); ?>           
            <?= \Canada\ElectionResultContainer::show(
                election: "2021",
                title: ["2021", "Federal", "Election"],
            ); ?>
            <?= \Canada\ElectionResultContainer::show(
                election: "2019",
                title: ["2019", "Federal", "Election"],
            ); ?>
            <?= \Canada\ElectionResultContainer::show(
                election: "2015",
                title: ["2015", "Federal", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
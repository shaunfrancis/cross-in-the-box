<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/uk-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>UK elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>The United Kingdom holds a <a href="/uk/general-elections">general election</a> at least once every five years to elect 650 members to its lower house, representing constituencies across England, Scotland, Wales and Northern Ireland. Three of these constituent countries have their own devolved legislatures and also hold elections every four or five years; they are the <a href="/uk/scottish-parliament">Scottish Parliament</a>, the <a href="/uk/senedd-cymru">Senedd Cymru (Welsh Parliament)</a> and the <a href="/uk/northern-ireland-assembly">Northern Ireland Assembly</a>.</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/uk/general-elections">General Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["2024", "General", "Election"],
                // dedicatedPage: '/uk/general-elections/2024'
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2019",
                title: ["2019", "General", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\General::show(
                election: "2017",
                title: ["2017", "General", "Election"],
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

        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/uk/scottish-parliament">Scottish Parliament Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\Scotland::show(
                election: "S2026",
                title: ["2026", "Scottish Parliament", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Scotland::show(
                election: "S2021",
                title: ["2021", "Scottish Parliament", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Scotland::show(
                election: "S2016",
                title: ["2016", "Scottish Parliament", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Scotland::show(
                election: "S2011",
                title: ["2011", "Scottish Parliament", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>

        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/uk/senedd-cymru">Senedd Cymru Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2026",
                title: ["2026", "Senedd Cymru", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2021",
                title: ["2021", "Senedd Cymru", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2016",
                title: ["2016", "Senedd Cymru", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2011",
                title: ["2011", "Senedd Cymru", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>

        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/uk/northern-ireland-assembly">Northern Ireland Assembly Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\NI::show(
                election: "N2022",
                title: ["2022", "NI Assembly", "Election"],
            ); ?>           
            <?= \UK\ElectionResultContainer\NI::show(
                election: "N2017",
                title: ["2017", "NI Assembly", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/nz-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>New Zealand elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>New Zealand holds a <a href="/new-zealand/general-elections">general election</a> at least once every three years to elect at least 120 members to its lower house.</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/new-zealand/general-elections">General Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \NewZealand\ElectionResultContainer::show(
                election: "2023",
                title: ["2023", "General", "Election"],
            ); ?>

            <?= \NewZealand\ElectionResultContainer::show(
                election: "2020",
                title: ["2020", "General", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
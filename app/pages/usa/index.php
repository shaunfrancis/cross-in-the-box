<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/usa-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>US elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>The United States holds a <a href="/usa/presidential-elections">presidential election</a> every four years to elect its head of state. <a href="/usa/house-elections">Elections to the House of Representatives</a> are held every two years to elect its entire lower chamber, while <a href="/usa/senate-elections">US Senate elections</a> - also held every two years - elect one third of its upper chamber at a time.</p>
        <p>Each of its 50 states holds a <a href="/usa/gubernatorial-elections">gubernatorial election</a> every two to four years to elect its head of government.</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/usa/presidential-elections">Presidential Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2024",
                title: ["2024", "Presidential", "Election"],
                dedicatedPage: '/usa/2024-elections'
            ); ?>
            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2020",
                title: ["2020", "Presidential", "Election"],
            ); ?>
            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2016",
                title: ["2016", "Presidential", "Election"],
            ); ?>
            <?= \USA\ElectionResultContainer\Presidential::show(
                election: "P2012",
                title: ["2012", "Presidential", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>

        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/usa/senate-elections">Senate Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2024",
                dataAttrs: ['class-no' => 1],
                title: ["2024", "Senate", "Election"],
                dedicatedPage: '/usa/2024-elections'
            ); ?>
            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2022",
                dataAttrs: ['class-no' => 3],
                title: ["2022", "Senate", "Election"]
            ); ?>
            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2020",
                dataAttrs: ['class-no' => 2],
                title: ["2020", "Senate", "Election"]
            ); ?>
            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2018",
                dataAttrs: ['class-no' => 1],
                title: ["2018", "Senate", "Election"],
                messages: ['group' => "2018"]
            ); ?>
            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2016",
                dataAttrs: ['class-no' => 3],
                title: ["2016", "Senate", "Election"]
            ); ?>
            <?= \USA\ElectionResultContainer\Senate::show(
                election: "S2014",
                dataAttrs: ['class-no' => 2],
                title: ["2014", "Senate", "Election"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>

        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/usa/house-elections">House Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\House::show(
                election: "H2024",
                title: ["2024", "House", "Election"],
                dedicatedPage: '/usa/2024-elections'
            ); ?>
            <?= \USA\ElectionResultContainer\House::show(
                election: "H2022",
                title: ["2022", "House", "Election"],
            ); ?>
            <?= \USA\ElectionResultContainer\House::show(
                election: "H2020",
                title: ["2020", "House", "Election"]
            ); ?>
            <?= \USA\ElectionResultContainer\House::show(
                election: "H2018",
                title: ["2018", "House", "Election"]
            ); ?>
            <?= \USA\ElectionResultContainer\House::show(
                election: "H2016",
                title: ["2016", "House", "Election"],
            ); ?>
            <?= \USA\ElectionResultContainer\House::show(
                election: "H2014",
                title: ["2014", "House", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>

        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/usa/gubernatorial-elections">Gubernatorial Elections</a>
            </h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2025",
                title: ["2025", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2024",
                title: ["2024", "Gubernatorial", "Elections"],
                dedicatedPage: '/usa/2024-elections'
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2023",
                title: ["2023", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2022",
                title: ["2022", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2021",
                title: ["2021", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2020",
                title: ["2020", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2019",
                title: ["2019", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2018",
                title: ["2018", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2017",
                title: ["2017", "Gubernatorial", "Elections"]
            ); ?>
            <?= \USA\ElectionResultContainer\Gubernatorial::show(
                election: "G2016",
                title: ["2016", "Gubernatorial", "Elections"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
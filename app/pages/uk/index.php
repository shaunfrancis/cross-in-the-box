<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Latest election results", 'src' => "/images/uk-nav-results.svg", 'id' => "latest" ],
    ];
?>
<main>
    <section id="hero">
        <h1>United Kingdom</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec blandit nibh. Nulla vehicula pretium purus et volutpat. Aenean imperdiet nunc nec massa elementum iaculis. In hac habitasse platea dictumst. Nulla molestie massa vel nibh porta placerat. Suspendisse leo mauris, cursus id ex sed, dapibus malesuada ante. Suspendisse congue facilisis mollis.</p>
    </section>

    <section id="latest">
        <div class="section-heading">
            <h1>Latest election results</h1>
        </div>
        <?= ElectionResultsSection::open(); ?>

            <?= \UK\ElectionResultContainer\General::show(
                election: "2024",
                title: ["2024", "General", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\NI::show(
                election: "N2022",
                title: ["2022", "NI Assembly", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Scotland::show(
                election: "S2021",
                title: ["2021", "Scottish Parliament", "Election"],
            ); ?>
            <?= \UK\ElectionResultContainer\Wales::show(
                election: "W2021",
                title: ["2021", "Senedd Cymru", "Election"],
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
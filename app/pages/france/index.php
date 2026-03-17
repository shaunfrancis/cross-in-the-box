<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Latest election results", 'src' => "/images/france-nav-results.svg", 'id' => "latest" ],
    ];
?>
<main>
    <section id="hero">
        <h1>France</h1>
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

            <?= \France\ElectionResultContainer::show(
                election: "2022",
                dataAttrs: ['round' => 2],
                title: ["2022", "Second", "Round"]
            ); ?>
            <?= \France\ElectionResultContainer::show(
                election: "2022",
                dataAttrs: ['round' => 1],
                title: ["2022", "First", "Round"]
            ); ?>

        <?= ElectionResultsSection::close(); ?>
    </section>
</main>
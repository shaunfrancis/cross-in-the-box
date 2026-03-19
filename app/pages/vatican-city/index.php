<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Overview", 'src' => "/images/nav-overview.svg", 'id' => "overview" ],
        [ 'title' => "Results pages", 'src' => "/images/vatican-nav-results.svg", 'id' => "pages" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Vatican elections</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="overview" class="content-section">
        <h1>Overview</h1>
        <p>The College of Cardinals holds a <a href="/vatican-city/papal-conclaves">papal conclave</a> to elect a pope - the head of the Catholic Church and sovereign of the Holy See which governs the Vatican City State - in the event of a vacancy, usually the result of the death of the incumbent.</p>
    </section>

    <section id="pages">
        <div class="section-heading">
            <h1>
                <a class="arrow-link" href="/vatican-city/papal-conclaves">Papal Conclaves</a>
            </h1>
        </div>
            <?= \VaticanCity\ConclaveResultContainer::show(
                parties: \API\PartiesService::call(["vatican"]) ?? [],
                election: "2025",
                title: ["2025","Papal","Conclave"],
            ); ?>
    </section>
</main>
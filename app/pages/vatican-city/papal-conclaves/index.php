<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/vatican-nav-results.svg", 'id' => "election-results" ],
    ];
?>
<main>
    <section id="hero">
        <h1>Papal Conclaves</h1>
        <?= HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <?= \VaticanCity\ConclaveResultContainer::show(
            parties: $parties,
            election: "2025",
            title: ["2025","Papal","Conclave"],
        ); ?>

        <?= \VaticanCity\ConclaveResultContainer::show(
            parties: $parties,
            election: "2013",
            title: ["2013","Papal","Conclave"],
        ); ?>

        <?= \VaticanCity\ConclaveResultContainer::show(
            parties: $parties,
            election: "2005",
            title: ["2005","Papal","Conclave"],
        ); ?>

        <?= \VaticanCity\ConclaveResultContainer::show(
            parties: $parties,
            election: "1978-10",
            title: ["Oct 1978","Papal","Conclave"],
        ); ?>

        <?= \VaticanCity\ConclaveResultContainer::show(
            parties: $parties,
            election: "1978-08",
            title: ["Aug 1978","Papal","Conclave"],
        ); ?>

        <?= \VaticanCity\ConclaveResultContainer::show(
            parties: $parties,
            election: "1963",
            title: ["1963","Papal","Conclave"],
        ); ?>
    </section>

</main>
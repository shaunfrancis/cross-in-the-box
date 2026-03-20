<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "election-results" ],
    ];
?>

<section id="hero">
    <a href="/usa/house-elections/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>House Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?php if(empty($_error)) echo HeroNav::show($heroNavItems); ?>
</section>

<?= RegionLayout::openSidebar(); ?>
    <section class="shaded purple">
        <h1>Find a district</h1>
        <?= \USA\RegionSearchSection::show("house"); ?>
    </section>
    <?php if(empty($_error)) : ?>
        <?= \USA\StateLinks::show($region['id']); ?>
        <section>
            <p>Candidates and results for each of the 435 districts are sourced from <a href="https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/" target="_blank">the Federal Election Commission</a>. Ranked Choice Voting results for Maine are obtained from the state's <a href="https://www.maine.gov/sos/cec/elec/results/index.html" target="_blank">Bureau of Corporations, Elections &amp; Commissions</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@crossinthebox.com?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
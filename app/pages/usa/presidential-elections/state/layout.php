<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "election-results" ],
    ];
?>

<section id="hero">
    <a href="/usa/presidential-elections/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>Presidential Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?php if(empty($_error)) echo HeroNav::show($heroNavItems); ?>
</section>

<?= RegionLayout::openSidebar(); ?>
    <section class="shaded purple">
        <h1>Find a state</h1>
        <?= \USA\RegionSearchSection::show("general"); ?>
    </section>
    <?php if(empty($_error)) : ?>
        <?= \USA\StateLinks::show($region['id']); ?>
        <section>
            <p>Data for the 2024 election are sourced from the certified election results, usually found on the state's Secretary of State website.</p>
            <p>Prior to 2024, data for each of the 50 states and the District of Columbia are sourced from <a href="https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/" target="_blank">the Federal Election Commission</a>. Results for Maine and Nebraska's congressional districts are sourced from their <a href="https://www.archives.gov/electoral-college/results" target="_blank">Certificates of Ascertainment of Electors</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@crossinthebox.com?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
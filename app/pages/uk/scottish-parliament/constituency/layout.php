<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "election-results" ],
    ];
?>

<section id="hero">
    <a href="/uk/scottish-parliament/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>Scottish Parliament Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?php if(empty($_error)) echo HeroNav::show($heroNavItems); ?>
</section>

<?= RegionLayout::openSidebar(); ?>
    <section class="shaded purple">
        <h1>Find a constituency or region</h1>
        <?= \UK\RegionSearchSection::show("scotland"); ?>
    </section>
    <?php if(empty($_error)) : ?>
        <section>
            <p>Results for the 2021 Scottish Parliament Election and all by-elections are sourced directly from the returning officer. Results for the 2016 and 2011 Scottich Parliament Elections are sourced from the <a href="https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/past-elections-and-referendums/scottish-parliamentary-elections">Electoral Commission</a>.</p>
            <p>Candidate names are sourced from <a href="https://www.bbc.co.uk/news/election/2016/scotland/results">BBC News</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@crossinthebox.com?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
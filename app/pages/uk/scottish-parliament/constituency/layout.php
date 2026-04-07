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
            <p>Results for the 2021 election and all by-elections are sourced directly from the returning officer's declaration of results. Results for the 2016 and 2011 elections are sourced from the <a href="https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/past-elections-and-referendums/scottish-parliamentary-elections" target="_blank">Electoral Commission</a>.</p>
            <p>Candidate names for the 2021 and 2011 elections are sourced from <a href="https://www.bbc.co.uk/news/election/2021/scotland/results" target="_blank">BBC News</a>. Candidate names for the 2016 election are sourced from <a href="https://democracyclub.org.uk" target="_blank">Democracy Club</a>, which is licensed under the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 (CC BY 4.0) license</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@crossinthebox.com?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
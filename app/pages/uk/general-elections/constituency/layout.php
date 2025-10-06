<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "" ],
    ];
?>

<section id="hero">
    <a href="/uk/general-elections/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>UK General Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?php if(empty($_error)) echo HeroNav::show($heroNavItems); ?>
</section>

<?= RegionLayout::openSidebar(); ?>
    <section class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show(); ?>
    </section>
    <?php if(empty($_error)) : ?>
        <!--<UKConstituencyPortrait region={region} />
        <UKConstituencyMap region={region} />-->
        <section>
            <p>Results for the 2019 General Election and all by-elections are sourced directly from the returning officer. Results for the 2017, 2015, and 2010 General Elections are sourced from the <a href="https://data.gov.uk/dataset/b77fcedb-4792-4de4-935f-4f344ed4c2c6/general-election-results-2017" target="_blank">Greater London Authority</a>.</p>
            <p>Candidate names for the 2024 and 2019 General Elections are sourced directly from each constituency's relevant Statement of Persons Nominated. Candidate names prior to 2019 and results prior to 2010 are sourced from <a href="https://en.wikipedia.org/wiki/United_Kingdom_Parliament_constituencies">Wikipedia</a> which is licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International license</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@tennessine.co.uk?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
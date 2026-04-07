<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "election-results" ],
    ];
?>

<section id="hero">
    <a href="/uk/northern-ireland-assembly/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>Northern Ireland Assembly Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?php if(empty($_error)) echo HeroNav::show($heroNavItems); ?>
</section>

<?= RegionLayout::openSidebar(); ?>
    <section class="shaded purple">
        <h1>Find a constituency</h1>
        <?= \UK\RegionSearchSection::show("ni"); ?>
    </section>
    <?php if(empty($_error)) : ?>
        <section>
            <p>Results for the 2022 Northern Ireland Assembly election are sourced from <a href="https://www.eoni.org.uk/results-data/ni-assembly-election-2022-results/" target="_blank">The Electoral Office for Northern Ireland</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@crossinthebox.com?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
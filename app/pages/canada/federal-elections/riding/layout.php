<?php 
    namespace Shared;
    $_headInjections[] = '<script src="/compiled/bespoke/CanadaRidingMap.bespoke.js" defer></script>';
    $_headInjections[] = '<link rel="stylesheet" type="text/css" href="/compiled/bespoke/CanadaRidingMap.bespoke.css" />';
    $heroNavItems = [
        [ 'title' => "Results and changes", 'src' => "/images/nav-region.svg", 'id' => "election-results" ],
    ];
?>

<section id="hero">
    <a href="/canada/federal-elections/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>Federal Elections</span>
    </a>

    <h1><?= $region['title']; ?></h1>
    <?php if(empty($_error)) echo HeroNav::show($heroNavItems); ?>
</section>

<?= RegionLayout::openSidebar(); ?>
    <section class="shaded purple">
        <h1>Find a riding</h1>
        <?= \Canada\RegionSearchSection::show(); ?>
    </section>
    <?php if(empty($_error)) : ?>
        <?= \Canada\RidingMap::show($region['id']); ?>
        <section>
            <p>Election results are sourced from <a href="https://www.elections.ca">Elections Canada</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@crossinthebox.com?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
    <?php endif; ?>
<?= RegionLayout::openMain(); ?>
    <?= $_children; ?>
<?= RegionLayout::close(); ?>
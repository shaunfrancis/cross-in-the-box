<?php namespace Shared; 
$_description[] = "Election results from around the globe. Explore our interactive maps for elections across Canada, France, Hungary, the UK, USA and Vatican City.";
$_headInjections[] = '<script src="/compiled/bespoke/LandingGlobe.bespoke.js" defer></script>';

$_headInjections[] = '<meta name="twitter:card" content="summary_large_image" />';
$_headInjections[] = '<meta name="twitter:site" content="@crossinthebox" />';
$_headInjections[] = '<meta name="twitter:title" content="Cross In The Box" />';
$_headInjections[] = '<meta name="twitter:description" content="Election results from around the globe. Explore our interactive maps for elections across Canada, France, Hungary, the UK, USA and Vatican City." />';
$_headInjections[] = '<meta name="twitter:image" content="https://crossinthebox.com/public/opengraph/index.png" />';

$_headInjections[] = '<meta property="og:url" content="https://crossinthebox.com" />';
$_headInjections[] = '<meta property="og:title" content="Cross In The Box" />';
$_headInjections[] = '<meta property="og:description" content="Election results from around the globe. Explore our interactive maps for elections across Canada, France, Hungary, the UK, USA and Vatican City." />';
$_headInjections[] = '<meta property="og:image" content="https://crossinthebox.com/public/opengraph/index.png" />';
?>

<?= LandingGlobe::show(); ?>
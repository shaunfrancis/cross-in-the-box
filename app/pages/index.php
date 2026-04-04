<?php namespace Shared; 
$_description[] = "Election results from around the globe. Explore our interactive maps for elections across Canada, France, Hungary, the UK, USA and Vatican City.";
$_headInjections[] = '<script src="/compiled/bespoke/LandingGlobe.bespoke.js" defer></script>';
?>

<?= LandingGlobe::show(); ?>
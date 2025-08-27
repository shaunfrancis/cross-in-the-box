<?php namespace Shared; ?>
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <link rel="stylesheet" type="text/css" href="/compiled/style.css" />
    <script src="/compiled/script.js"></script>
</head>
<body>
    <?php Header::show(
        function_exists('Shared\getCountryName') ? getCountryName() ?? '' : (!empty($countryName) ? $countryName : ''),
        function_exists('Shared\getCountryAbbrev') ? getCountryAbbrev() ?? NULL : (!empty($countryAbbrev) ? $countryAbbrev : NULL),
        function_exists('Shared\getLinks') ? getLinks() ?? [] : (!empty($links) ? $links : []),
    ); ?>
    <?= $children ?? ""; ?>
</body>
</html>
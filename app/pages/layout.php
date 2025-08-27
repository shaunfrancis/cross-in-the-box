<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <link rel="stylesheet" type="text/css" href="/compiled/style.css" />
    <script src="/compiled/script.js"></script>
</head>
<body>
    <?php Header::show(
        $countryName = function_exists('getCountryName') ? getCountryName() ?? '' : (!empty($countryName) ? $countryName : ''),
        $countryAbbrev = function_exists('getCountryAbbrev') ? getCountryAbbrev() ?? NULL : (!empty($countryAbbrev) ? $countryAbbrev : NULL),
        $links = function_exists('getLinks') ? getLinks() ?? [] : (!empty($links) ? $links : []),
    ); ?>
    <?= $children ?? ""; ?>
</body>
</html>
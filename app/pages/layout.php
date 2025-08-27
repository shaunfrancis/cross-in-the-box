<?php namespace Shared; ?>
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <link rel="stylesheet" type="text/css" href="/compiled/style.css" />
    <script src="/compiled/components.js"></script>
    <?php foreach($headInjections ?? [] as $content) echo $content; ?>
</head>
<body>
    <?php Header::show($countryName ?? '', $countryAbbrev ?? NULL, $headerLinks ?? []); ?>
    <?= $children ?? ""; ?>
</body>
</html>
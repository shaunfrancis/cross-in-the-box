<?php namespace Shared; ?>
<!DOCTYPE html>
<html>
<head>
    <title><?= implode(" | ", $_title ?? []); ?><?= count($_title ?? []) > 0 ? " | " : ""; ?>Cross In The Box</title>
    <link rel="stylesheet" type="text/css" href="/compiled/style.css" />
    <?php if(!empty($_country)) : ?><script src="/compiled/<?= $_country; ?>.js"></script><?php endif; ?>
    <?php foreach($_headInjections ?? [] as $content) echo $content; ?>
</head>
<body>
    <?= Header::show($_countryName ?? '', $_countryAbbrev ?? NULL, $_headerLinks ?? []); ?>
    <?= $_children ?? ""; ?>
</body>
</html>
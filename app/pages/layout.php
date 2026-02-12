<?php namespace Shared; ?>
<!DOCTYPE html>
<html>
<head>
    <script>
        window.addEventListener("pagereveal", (event) => {
            if(!navigation.activation.from || !navigation.activation.entry) return;
            if(new URL(navigation.activation.from.url).pathname === "/") document.documentElement.classList.add("from-globe");
            if(new URL(navigation.activation.entry.url).pathname === "/") document.documentElement.classList.add("to-globe");
        });
    </script>
    <title><?php
        if(!empty($_error)) echo ($_error_title ?? $_error) . " | ";
        echo implode(" | ", $_title ?? []); ?><?= count($_title ?? []) > 0 ? " | " : ""; 
    ?>Cross In The Box</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/compiled/style.css" />
    <?php if(!empty($_country)) : ?><script src="/compiled/<?= $_country; ?>.js"></script><?php endif; ?>
    <?php foreach($_headInjections ?? [] as $content) echo $content; ?>
</head>
<body>
    <?= Header::show($_countryName ?? '', $_countryAbbrev ?? NULL, $_headerLinks ?? []); ?>
    <?= $_children ?? ""; ?>
    <?= Footer::show(); ?>
</body>
</html>
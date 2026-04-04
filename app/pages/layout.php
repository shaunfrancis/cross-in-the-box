<?php namespace Shared; ?>
<!DOCTYPE html>
<html lang="en">
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

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php if(!empty($_description) && empty($_error)) : ?><meta name="description" content="<?= $_description[0]; ?>" /><?php endif; ?>

    <link rel="stylesheet" type="text/css" href="/compiled/style.css" />
    <?php if(!empty($_country)) : ?><script src="/compiled/<?= $_country; ?>.js"></script><?php endif; ?>

    <?php $faviconPath = !empty($_country) ? "/public/favicons/" . $_country : "/public/"; ?>
    <link rel="icon" type="image/png" href="<?= $faviconPath; ?>/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="<?= $faviconPath; ?>/favicon-48x48.png" sizes="48x48" />
    <link rel="icon" type="image/png" href="<?= $faviconPath; ?>/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="<?= $faviconPath; ?>/favicon.svg" />
    <link rel="shortcut icon" href="<?= $faviconPath; ?>/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="<?= $faviconPath; ?>/apple-touch-icon.png" />
    <link rel="manifest" href="<?= $faviconPath; ?>/site.webmanifest" />
    
    <?php foreach($_headInjections ?? [] as $content) echo $content; ?>
</head>
<body>
    <?= Header::show($_countryName ?? '', $_countryAbbrev ?? NULL, $_countryFlag ?? NULL, $_headerLinks ?? []); ?>
    <?= $_children ?? ""; ?>
    <?= Footer::show(); ?>
</body>
</html>
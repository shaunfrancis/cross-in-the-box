<?php
namespace Shared;

class Header extends \Base\Component{

    static function render(string $countryName, ?string $countryAbbrev = NULL, ?array $links = []): void { 
        global $request;
    ?>
    
        <header id="Header">

            <a href="/" id="Header__logo-container">
                <img
                    src="/public/images/<?= !empty($countryAbbrev) ? $countryAbbrev . "-logo.svg" : "logo.png"; ?>" 
                    alt="Cross In The Box"
                />
            </a>

            <h1><a href="/" class="unstyled"><?= $countryName; ?></a></h1>

            <nav>
                <ul>
                    <?php foreach($links as $link) : ?>
                        <li class="<?= str_starts_with('/' . implode('/', $request), $link['path']) ? "Header__selected" : ""; ?>">
                            <a href="<?= $link['path']; ?>"><?= $link['title']; ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </nav>
        </header>

    <?php }
}
<?php
namespace Shared;

class Header extends \Base\Component{

    static function render(string $countryName, ?string $countryAbbrev = NULL, ?string $countryFlag = NULL, ?array $links = []) : void { 
        global $_request;
    ?>
    
        <header id="Header">

            <a href="/" id="Header__logo-container">
                <img
                    src="/public/images/<?= !empty($countryAbbrev) ? $countryAbbrev . "-logo.svg" : "logo.png"; ?>" 
                    alt="Cross In The Box"
                />
            </a>

            <?php if(!empty($countryAbbrev)) : ?>
                <h1><a href="/<?= $countryAbbrev; ?>" class="unstyled">
                    <?php if(!empty($countryFlag)) : ?>
                        <img src="/public/images/<?= $countryFlag; ?>" class="Header__flag" alt="" />
                    <?php endif; ?>
                    <span><?= $countryName; ?></span>
                </a></h1>
            <?php endif; ?>

            <?php if(!empty($links)) : ?>
                <nav>
                    <ul>
                        <?php foreach($links as $link) : ?>
                            <li class="<?= str_starts_with('/' . implode('/', $_request), $link['path']) ? "Header__selected" : ""; ?>">
                                <a href="<?= $link['path']; ?>"><?= $link['title']; ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </nav>
            <?php endif; ?>
        </header>

    <?php }
}
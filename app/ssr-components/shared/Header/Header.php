<?php
namespace Shared;

class Header extends \Base\Component{

    static function render(string $countryName, ?array $countryTranslations = [], ?string $countryAbbrev = NULL, ?string $countryFlag = NULL, ?array $links = []) : void { 
        global $_request;

        $live_event = \API\LiveEventsService::call([])[0] ?? NULL;
        if(!empty($live_event) && $countryAbbrev === $live_event['country']) $live_event['local'] = TRUE;
    ?>
    
        <header id="Header">

            <a href="/" id="Header__logo-container">
                <img
                    src="/public/images/<?= !empty($countryAbbrev) ? $countryAbbrev . "-logo.svg" : "logo.png"; ?>" 
                    alt="Cross In The Box"
                />
            </a>

            <?php if(!empty($countryAbbrev)) : ?>
                <hgroup><a href="/<?= $countryAbbrev; ?>" class="unstyled">
                    <?php if(!empty($countryFlag)) : ?>
                        <img src="/public/images/<?= $countryFlag; ?>" class="Header__flag" alt="" />
                    <?php endif; ?>
                    <div>
                        <h1><?= $countryName; ?></h1>
                        <?php if(!empty($countryTranslations)) : ?>
                            <?php if(count($countryTranslations) > 1) : ?>
                                <span>
                            <?php endif; ?>
                                    <?php foreach($countryTranslations as $lang => $label) : ?>
                                        <span lang="<?= $lang; ?>"><?= $label; ?></span>
                                    <?php endforeach; ?>
                            <?php if(count($countryTranslations) > 1) : ?>
                                </span>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                </a></hgroup>
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

        <?php if(
            !empty($_request[0]) &&
            !empty($live_event) && 
            !str_starts_with('/' . implode('/', $_request), $live_event['destination']) &&
            (!empty($live_event['local']) || !empty($live_event['global_notification'])
        )) : ?>
            <div id="Header__notification">
                <div>
                    <img src="/public/images/live.svg" alt="" />
                    <p>Live now: <a href="<?= $live_event['destination'] ?? "#"; ?>"><?php
                        if(!empty($live_event['local'])){
                            echo $live_event['local_notification'] ?? $live_event['global_notification'];
                        }
                        else echo $live_event['global_notification'];
                    ?></a></p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M 7.33,0 4.5,2.829 13.839,12.004 4.5,21.171 7.33,24 19.5,12.004 Z"/>
                </svg>
            </div>
        <?php endif; ?>

    <?php }
}
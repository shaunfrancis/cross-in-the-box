<?php
namespace Shared;

class Footer extends \Base\Component{

    static function render(): void { 
        global $_request, $_initial_request, $_sitemap;
        if(!empty($_request)) $page = "/" . implode("/", $_request);
    ?>
    
        <footer id="Footer">
            <div id="Footer__container">

                <div id="Footer__logo-container">
                    <a href="/">
                        <img src="/public/images/monochrome-logo.svg" alt="Cross In The Box" />
                    </a>
                    <div class="Footer__logo-label">
                        <a href="/" class="unstyled">
                            <h1>Cross In The Box</h1>
                        </a>
                        <p>A <a href="https://tennessine.co.uk">Tennessine</a> project</p>
                    </div>
                </div>

                <ul id="Footer__social-container">
                    <li><a href="mailto:hello@crossinthebox.com">
                        <img src="/public/images/email.svg" alt="Email" />
                    </a></li>
                    <li><a href="https://twitter.com/crossinthebox">
                        <img src="/public/images/x.svg" alt="Twitter/X" />
                    </a></li>
                    <li><a href="https://instagram.com/cross.in.the.box">
                        <img src="/public/images/instagram.png" alt="Instagram" />
                    </a></li>
                </ul>

                <?php if(!empty($_initial_request)) : ?>
                    <nav id="Footer__sitemap">
                        <?php foreach($_sitemap as $country): ?>
                            <section class="Footer__top-level-section" style="--row-span:<?= count($country['children']); ?>">
                                <h2>
                                    <a href="<?= $country['href']; ?>" class="unstyled<?= !empty($page) && str_starts_with($page, $country['href']) ? " Footer__current-page" : ""; ?>">
                                        <?= $country['label']; ?>
                                    </a>
                                </h2>
                                <?php if(!empty($country['children'])) : ?>
                                    <ul>
                                        <?php foreach($country['children'] as $child) : ?>
                                            <li>
                                                <a href="<?= $child['href']; ?>" class="unstyled<?= !empty($page) && str_starts_with($page, $child['href']) ? " Footer__current-page" : ""; ?>">
                                                    <?= $child['label']; ?>
                                                </a>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>
                            </section>

                        <?php endforeach; ?>
                    </nav>
                <?php endif; ?>
                
            </div>
        </footer>

    <?php }
}
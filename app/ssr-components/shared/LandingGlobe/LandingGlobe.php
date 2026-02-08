<?php
namespace Shared;

class LandingGlobe extends \Base\Component{

    static function render(): void { 
        global $_sitemap;
        ?>
        <div id="LandingGlobe" class="loading">

            <svg id="LandingGlobe__placeholder" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="shading" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(-45)">
                        <stop offset="0%" stop-color="rgb(248,248,244)" />
                        <stop offset="50%" stop-color="rgb(100,106,111)" />
                        <stop offset="100%" stop-color="rgb(248,248,244)" />
                    </linearGradient>
                </defs>
                <circle cx="0" cy="0" r="0.75" fill="url(#shading)" />
            </svg>
            <script>
                const l = 0, r = Math.min(1.5, Math.max(0.75, window.innerWidth/1024 * 1.5 )),
                t = Math.min(0.75, 0.75 * window.innerHeight / window.innerWidth), b = -0.75,
                w = r - l, h = t - b;
                const svg = document.getElementById('LandingGlobe__placeholder');
                svg.style.width = window.innerWidth + "px";
                svg.style.height = window.innerWidth * h / w + "px";
                svg.setAttribute('viewBox', `${l} ${(-1)*t} ${w} ${h}`);
            </script>

            <div class="hover-popup hidden"></div>
            <main>
                <hgroup>
                    <img src="/public/images/logo-icon.png" alt="" />
                    <h1>Cross In The Box</h1>
                    <p>Election results from around the globe</p>
                </hgroup>
                
                <?php foreach($_sitemap as $country): ?>
                    <article>
                        <h2>
                            <a class="unstyled" href="<?= $country['href']; ?>">
                                <?= $country['label']; ?>
                            </a>
                        </h2>
                        <?php if(!empty($country['children'])) : ?>
                            <ul>
                                <?php foreach($country['children'] as $child) : ?>
                                    <li>
                                        <a href="<?= $child['href']; ?>">
                                            <?= $child['label']; ?>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </article>

                <?php endforeach; ?>

            </main>
        </div>
    <?php }

}
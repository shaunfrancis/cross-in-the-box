<?php
namespace Shared;

class LandingGlobe extends \Base\Component{

    static function render(): void { 
        global $_sitemap;
        ?>
        <div id="LandingGlobe" class="loading">
            <div class="hover-popup hidden"></div>
            <main>
                <hgroup>
                    <h1>Cross In The Box</h1>
                    <p>Election results from around the globe</p>
                </hgroup>
                
                <?php foreach($_sitemap as $country): ?>
                    <article>
                        <h2>
                            <a href="<?= $country['href']; ?>">
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
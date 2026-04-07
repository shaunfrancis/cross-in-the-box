<?php
namespace UK;

class RegionPortrait extends \Base\Component{

    static function render(?string $id = NULL): void { 
        if(empty($id)) return;

        $portrait = \API\UK\PortraitService::call(["uk", NULL, $id]);
        if(empty($portrait['hasPortrait']) || !empty($portrait['error'])) return;

        ?>
        <section class="RegionPortrait">
            <h1>Official portrait</h1>
            <img src="<?= $portrait['src']; ?>" width="100%" alt="The official portrait of this constituency's MP." />
            <p>Portrait is released under an <a target="_blank" href="https://creativecommons.org/licenses/by/3.0/">Attribution 3.0 Unported (CC BY 3.0)</a> licence on the <a target="_blank" href="<?= $portrait['attribution']; ?>">UK Parliament website</a>.</p>
        </section>
    <?php }

}
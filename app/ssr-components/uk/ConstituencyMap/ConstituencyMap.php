<?php
namespace UK;

class ConstituencyMap extends \Base\Component{

    static function render(string $id): void { ?>
        <section class="ConstituencyMap" data-region-id="<?= $id; ?>">
            <h1>Constituency map</h1>
            <div class="ConstituencyMap__map" />
        </section>
    <?php }

}
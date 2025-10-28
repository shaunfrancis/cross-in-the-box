<?php
namespace Canada;

class RidingMap extends \Base\Component{

    static function render(string $id): void { ?>
        <section class="RidingMap" data-region-id="<?= $id; ?>">
            <h1>Riding map</h1>
            <div class="RidingMap__map" />
        </section>
    <?php }

}
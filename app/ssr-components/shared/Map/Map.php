<?php
namespace Shared;

class Map extends \Base\Component{
    static function render($type = "cartographic"): void { ?>
        <div class="ElectionResultContainer__map-container">
            <?php foreach(static::$types as $key => $path) : ?>
                <?php if($key === $type) : ?>
                    <div data-type="<?= $type; ?>" data-src="<?= $path; ?>">
                        <?= !empty(static::$types[$type]) ? file_get_contents(static::$types[$type]) : ''; ?>
                    </div>
                <?php else : ?>
                    <div class="hidden" data-type="<?= $key; ?>" data-src="<?= $path; ?>"></div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    <?php }
}
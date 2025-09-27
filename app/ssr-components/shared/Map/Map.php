<?php
namespace Shared;

class Map extends \Base\Component{
    static function render($type = "cartographic"): void { ?>
        <div class="ElectionResultContainer__map-container">
            <?php foreach(static::$types as $key => $path) : ?>
                <?php if($key === $type) : ?>
                    <?= !empty(static::$types[$type]) ? file_get_contents(static::$types[$type]) : ''; ?>
                <?php else : ?>
                    <input type="hidden" data-type="<?= $key; ?>" data-src="<?= $path; ?>" />
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    <?php }
}
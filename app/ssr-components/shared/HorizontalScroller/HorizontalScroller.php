<?php
namespace Shared;

class HorizontalScroller extends \Base\Component{

    static function render(
        string $id,
    ): void { ?>
        <div class="HorizontalScroller" data-id="<?= $id; ?>">
            <button aria-label="Scroll to the left" class="HorizontalScroller__button"></button>
            <div class="HorizontalScroller__track">
                <div class="HorizontalScroller__thumb"></div>
                <div class="HorizontalScroller__items"></div>
            </div>
            <button aria-label="Scroll to the right" class="HorizontalScroller__button"></button>
        </div>
    <?php }

}
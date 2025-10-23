<?php
namespace Shared;

class Toggle extends \Base\Component{

    static function render(string $from, string $to, string $id = ""): void { ?>
        <div class="Toggle"<?php if(!empty($id)) : ?> data-id="<?= $id; ?>"<?php endif; ?>>

            <button class="Toggle__off unstyled">
                <img src="/public/<?= $from; ?>" />
            </button>

            <button class="Toggle__outer unstyled">
                <div class="Toggle__inner"></div>
            </button>
            
            <button class="Toggle__on unstyled">
                <img src="/public/<?= $to; ?>" />
            </button>

        </div>
    <?php }

}
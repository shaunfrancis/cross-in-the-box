<?php
namespace Shared;

class Toggle extends \Base\Component{

    static function render(string $from, string $to, string $id = "", array $ariaLabels = []): void { ?>
        <div class="Toggle"<?php if(!empty($id)) : ?> data-id="<?= $id; ?>"<?php endif; ?>>

            <button class="Toggle__off unstyled" aria-label="<?= $ariaLabels['off'] ?? 'Toggle off'; ?>">
                <img alt="" src="/public/<?= $from; ?>" />
            </button>

            <button class="Toggle__outer unstyled" aria-label="<?= $ariaLabels['toggle'] ?? 'Toggle'; ?>">
                <div class="Toggle__inner"></div>
            </button>
            
            <button class="Toggle__on unstyled" aria-label="<?= $ariaLabels['on'] ?? 'Toggle on'; ?>">
                <img alt="" src="/public/<?= $to; ?>" />
            </button>

        </div>
    <?php }

}
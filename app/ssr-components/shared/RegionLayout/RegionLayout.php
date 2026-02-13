<?php
namespace Shared;

class RegionLayout extends \Base\Component{

    static function openSidebar(): void { 
        ob_start();
    ?>

        <div class="RegionPage pre-hydration">
            <aside>
                <?php //Children ?>

    <?php }

    static function openMain(?string $partyWidth = NULL): void { ?>
            </aside>
            <main<?= !empty($partyWidth) ? " style=\"--party-width:{$partyWidth}\"" : ""; ?>>
                <?php //Children ?>
    <?php }

    static function renderClose(): void{ echo '</main></div>'; }

}
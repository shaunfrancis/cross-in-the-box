<?php
namespace Shared;

class RegionLayout extends \Base\Component{

    static function openSidebar(): void { 
        ob_start();
    ?>

        <div class="RegionPage">
            <aside>
                <?php //Children ?>

    <?php }

    static function openMain(): void { ?>
            </aside>
            <main>
                <?php //Children ?>
    <?php }

    static function renderClose(): void{ echo '</main></div>'; }

}
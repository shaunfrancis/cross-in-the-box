<?php
namespace Shared;

class RegionPage extends \Base\Component{

    static function openSidebar(

    ): void { ?>

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
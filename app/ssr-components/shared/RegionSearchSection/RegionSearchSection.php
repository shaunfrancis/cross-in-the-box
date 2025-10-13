<?php
namespace Shared;

class RegionSearchSection extends \Base\Component{
    static function render($type = NULL){ ?>
        <div class="RegionSearchSection"<?= !empty($type) ? sprintf('data-type="%s"', $type) : ""; ?>>
            <div class="RegionSearchSection__search-container">
                <input type="text" class="RegionSearchSection__search-input" spellcheck="false">
            </div>
            <div class="RegionSearchSection__status-container"></div>
            <div class="RegionSearchSection__results-container"></div>
        </div>
    <?php }
}
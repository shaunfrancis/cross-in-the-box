<?php
namespace Shared;

class RegionSearchSection extends \Base\Component{
    static function render(){ ?>
        <div class="RegionSearchSection">
            <div class="RegionSearchSection__search-container">
                <input type="text" class="RegionSearchSection__search-input" spellcheck="false">
            </div>
            <div class="RegionSearchSection__status-container"></div>
            <div class="RegionSearchSection__results-container"></div>
        </div>
    <?php }
}
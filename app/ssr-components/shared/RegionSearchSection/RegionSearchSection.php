<?php
namespace Shared;

class RegionSearchSection extends \Base\Component{
    static function render(?string $type = NULL, ?string $partyWidth = NULL){ ?>
        <div class="RegionSearchSection"<?= !empty($type) ? sprintf('data-type="%s"', $type) : ""; ?><?= !empty($partyWidth) ? sprintf('style="--RegionSearchSection__party-width:%s"', $partyWidth) : ""; ?>>
            <div class="RegionSearchSection__search-container">
                <input type="text" class="RegionSearchSection__search-input" spellcheck="false">
            </div>
            <div class="RegionSearchSection__status-container"></div>
            <div class="RegionSearchSection__results-container"></div>
        </div>
    <?php }
}
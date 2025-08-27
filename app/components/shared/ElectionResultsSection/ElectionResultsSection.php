<?php
namespace Shared;

class ElectionResultsSection extends \Base\Component{
    static function renderOpen(): void { ?>
        <div class="ElectionResultsSection">
    <?php }
    static function renderClose(): void { echo '</div>'; }
}
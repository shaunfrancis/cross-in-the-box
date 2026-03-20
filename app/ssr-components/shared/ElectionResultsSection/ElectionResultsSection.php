<?php
namespace Shared;

class ElectionResultsSection extends \Base\Component{
    static function renderOpen(): void { 
        $scrollerId = uniqid();
    ?>
        <?= HorizontalScroller::show(id: $scrollerId); ?>
        <div class="ElectionResultsSection" data-scroller="<?= $scrollerId; ?>">
    <?php }
    static function renderClose(): void { echo '</div>'; }
}
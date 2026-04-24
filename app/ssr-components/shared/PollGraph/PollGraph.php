<?php
namespace Shared;
include_once './app/lib/shared.php';

class PollGraph extends \Base\Component{

    static $labelledTicks = [];
    
    static function render(
        array $polls,               // Poll[]
        ?int $maxParties = NULL,    // number
        ?bool $compact = FALSE,     // bool
    ){ 
        if(empty($polls)) return;
        $w = 1100; $h = 580;

    ?>
        <div class="PollGraph pre-hydration">
            <script type="application/json" class="PollGraph__data">
                <?= json_encode([
                    'w' => $w,
                    'h' => $h,
                    'polls' => array_map(
                        fn($p) => ['start'=>$p['start'], 'end'=>$p['end'], 'sample'=>$p['sample'] ?? '–', 'figures'=>$p['figures']], 
                        $polls
                    ),
                    'maxParties' => $maxParties,
                    'compact' => $compact,
                    'averages' => getPollAverages($polls),
                    'labelledTicks' => static::$labelledTicks
                ]); ?>
            </script>
            <svg class="PollGraph__graph" viewBox="0 -10 <?= $w + 5; ?> <?= $h + 10; ?>"></svg>
        </div>
    <?php }

}
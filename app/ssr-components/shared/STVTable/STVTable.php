<?php
namespace Shared;

class STVTable extends \Base\Component{
    
    static function render(
        array $results
    ){ 
        $rounds = 0;
        foreach($results as $result){
            if(($result['subid'] ?? 0) > $rounds) $rounds = $result['subid'];
        }

        $combinedResults = combineSubElections($results);
        usort($combinedResults, function($a, $b){
            $firstPrefs = fn ($x) => $x['results'][array_key_first($x['results'])]['votes'];
            return $firstPrefs($b) - $firstPrefs($a);
        });

        $totalVotes = 0;
        $totalElected = 0;
        foreach($combinedResults as $result){
            $totalVotes += $result['results'][array_key_first($result['results'])]['votes'];
            if(!empty( array_filter($result['results'], fn($stage) => !empty($stage['elected']))) ) $totalElected++;
        }
        
        $quota = floor(1 + ($totalVotes / (($totalElected ?? 1) + 1)));

        ?>

        <dl class="key-information">
            <div>
                <dd>Quota:</dd>
                <dt class="tnum"><?= number_format($quota, 0, ".", " "); ?></dt>
            </div>
        </dl>

        <div class="block-scroller">
            <table class="STVTable pre-hydration" style="--max-rounds:<?= $rounds; ?>"> 
                <thead>
                    <tr class="STVTable__header STVTable__row">
                        <th class="STVTable__bloc bloc">Party</th>
                        <th class="STVTable__bloc bloc">Candidate</th>
                        <th class="STVTable__bloc bloc">First preferences</th>
                        <?php for($i = 2; $i <= $rounds; $i++): ?>
                            <th class="STVTable__bloc bloc">Stage <?= $i; ?></th>
                        <?php endfor; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($combinedResults as $combinedResult): ?>
                        <?php $candidateGetsElected = array_find($combinedResult['results'], fn($result) => !empty($result['elected'])); ?>

                        <tr class="STVTable__row" data-party="<?= $combinedResult['party']; ?>">
                            <td class="STVTable__party STVTable__bloc bloc">
                                <span><?= $combinedResult['party']; ?></span>
                                <div class="STVTable__hover"></div>
                            </td>
                            <td
                                class="STVTable__candidate STVTable__bloc bloc<?= $candidateGetsElected ? " STVTable__elected" : ""; ?>">
                                <?= $combinedResult['candidates'][0]['name'];?>
                            </td>
                            <?php 
                                $previousVotes = 0;
                                $previouslyElected = FALSE;
                                foreach($combinedResult['results'] as $subid => $result):
                            ?>

                                <?php if($subid == 1) : ?>
                                    <td class="STVTable__bloc bloc tnum">
                                        <?= number_format($result['votes'] / $totalVotes * 100, 2, ".", " "); ?>%
                                    </td>
                                <?php else : ?>
                                    <td class="STVTable__bloc bloc STVTable__change tnum">
                                        <?php 
                                            $change = $result['votes'] - $previousVotes;
                                            if($change != 0):
                                        ?>
                                            <?= $change > 0 ? "+" : "–"; ?><?= number_format(abs($change), 0, ".", " "); ?>
                                        <?php endif; ?>
                                    </td>
                                <?php endif; ?>

                                <td class="STVTable__bloc bloc tnum
                                    <?= ( ($result['votes'] >= $quota || !empty($result['elected'])) ) && !$previouslyElected ? "STVTable__elected" : ""; ?>
                                    <?= $previouslyElected ? "STVTable__previously-elected" : ""; ?>
                                    <?= array_key_last($combinedResult['results']) == $subid && empty($result['elected']) && !$previouslyElected ? "STVTable__eliminated" : ""; ?>
                                ">
                                    <?= number_format($result['votes'], 0, ".", " "); ?>
                                </td>
                                
                            <?php 
                                if($result['votes'] >= $quota || !empty($result['elected'])) $previouslyElected = TRUE;
                                $previousVotes = $result['votes'];
                                endforeach; 
                            ?>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php }
}
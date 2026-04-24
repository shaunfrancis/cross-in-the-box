<?php
namespace Shared;

class DHondtTable extends \Base\Component{
    
    static function render(
        array $results,
        ?array $divisors = NULL,
        ?int $fixedRounds = 0
    ){ 
        $hasNonzeroInitialDivisor = FALSE; // used to determine whether to show 'Round 1' heading

        $totalVotes = 0;
        $totalElected = 0;
        $rounds = $fixedRounds ?? 0;
        foreach($results as &$result){
            $totalVotes += $result['votes'];

            if(!empty($divisors[$result['party']])) $result['initialDivisor'] = $divisors[$result['party']] + 1;
            else $result['initialDivisor'] = 1;
            if($result['initialDivisor'] > 1) $hasNonzeroInitialDivisor = TRUE;

            foreach($result['candidates'] as &$candidate){
                if(empty($fixedRounds)) $rounds += $candidate['elected'];
                $totalElected += $candidate['elected'];
            }
        }

        $currentElectedCount = 0;
        for($i = 0; $i < $rounds; $i++){
            $maxVotes = ['votes' => -INF];
            foreach($results as &$result){
                $remainingCandidates = $result['rounds'][array_key_last($result['rounds'] ?? [''])]['remainingCandidates']
                    ?? count($result['candidates']);
                if($remainingCandidates === 0){
                    $result['rounds'][] = ['votes' => NULL, 'remainingCandidates' => 0];
                    continue;
                }

                $party = $result['party'];
                $divisor = $result['rounds'][$i - 1]['divisor'] ?? $result['initialDivisor'] ?? 1;
                $votes = $result['votes'] / $divisor;

                $result['rounds'][] = [
                    'votes' => $votes,
                    'divisor' => $divisor,
                    'remainingCandidates' => $remainingCandidates
                ];

                if($votes > $maxVotes['votes']){
                    $maxVotes = &$result['rounds'][$i];
                }
            }

            if($maxVotes['votes'] > 0){
                $currentElectedCount++;
                if($currentElectedCount > $totalElected) $maxVotes['leading'] = TRUE;
                else $maxVotes['elected'] = TRUE;
                $maxVotes['divisor'] += 1;
                $maxVotes['remainingCandidates'] -= 1;
            }
            unset($maxVotes, $result);
        }
        
    ?>
        <div class="block-scroller">
            <table class="DHondtTable pre-hydration" style="--max-rounds:<?= $hasNonzeroInitialDivisor ? $rounds : $rounds - 1; ?>"> 

                <thead>
                    <tr class="DHondtTable__header DHondtTable__row">
                        <th class="DHondtTable__bloc bloc">Party</th>
                        <?php if($hasNonzeroInitialDivisor) : ?><th class="DHondtTable__bloc bloc">Votes</th><?php endif; ?>
                        <?php for($i = 1; $i <= $rounds; $i++): ?>
                            <th class="DHondtTable__bloc bloc">Round <?= $i; ?></th>
                        <?php endfor; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php unset($result); foreach($results as $result): ?>
                        <tr class="DHondtTable__row" data-party="<?= $result['party']; ?>">

                            <td class="DHondtTable__party DHondtTable__bloc bloc">
                                <span><?= $result['party']; ?></span>
                                <div class="DHondtTable__hover">
                                    <?php if($result['party'] === "ind"):?>
                                        Independent (<?= $result['candidates'][0]['name']; ?>)
                                    <?php endif; ?>
                                </div>
                            </td>

                            <td class="DHondtTable__percentage DHondtTable__bloc bloc tnum">
                                <?= $totalVotes != 0 ? number_format(100 * $result['votes'] / $totalVotes, 2, '.', '') : ""; ?>%
                            </td>

                            <?php if($hasNonzeroInitialDivisor) : ?>
                                <td class="DHondtTable__bloc bloc tnum">
                                    <?= number_format($result['votes'] ?? 0, 0, ".", " "); ?>
                                </td>
                            <?php endif; ?>

                            <?php foreach($result['rounds'] ?? [] as $round): ?>
                                <td class="DHondtTable__bloc bloc tnum<?= !empty($round['elected']) ? " DHondtTable__elected" : ""; ?><?= !empty($round['leading']) ? " DHondtTable__leading" : ""; ?>">
                                    <?= !empty($round['votes']) ? number_format($round['votes'], 0, ".", " ") : ''; ?>
                                </td>
                            <?php endforeach; ?>

                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php }

}
<?php
namespace UK;

class DHondtTable extends \Base\Component{
    
    static function render( 
        array $title,
        array $results,
    ){ 
        $totalVotes = 0;
        $rounds = 0;
        foreach($results as &$result){
            $totalVotes += $result['votes'];

            // this needs to be automated
            $result['initialDivisor'] = match($result['party']){
                'snp' => 7,
                'ld' => 3,
                default => 1
            };

            foreach($result['candidate'] as &$candidate){
                $rounds += $candidate['elected'];
            }
        }

        for($i = 0; $i < $rounds; $i++){
            $maxVotes = ['votes' => -INF];
            foreach($results as &$result){
                $remainingCandidates = $result['rounds'][array_key_last($result['rounds'] ?? [''])]['remainingCandidates']
                    ?? count($result['candidate']);
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
            $maxVotes['elected'] = TRUE;
            $maxVotes['divisor'] += 1;
            $maxVotes['remainingCandidates'] -= 1;
            unset($maxVotes, $result);
        }
        
    ?>
        <h2><?= $title[0]; ?> <?= ($title[1] ?? "") . (substr($title[1] ?? "", -1) === "-" ? "" : " ") . ($title[2] ?? ""); ?></h2>
        <table class="DHondtTable pre-hydration" style="--max-rounds:<?= $rounds; ?>"> 

            <thead>
                <tr class="DHondtTable__header DHondtTable__row">
                    <th class="DHondtTable__bloc">Party</th>
                    <th class="DHondtTable__bloc">Votes</th>
                    <?php for($i = 1; $i <= $rounds; $i++): ?>
                        <th class="DHondtTable__bloc">Round <?= $i; ?></th>
                    <?php endfor; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach($results as $result): ?>
                    <tr class="DHondtTable__row" data-party="<?= $result['party']; ?>">

                        <td class="DHondtTable__party DHondtTable__bloc">
                            <span><?= $result['party']; ?></span>
                            <div class="DHondtTable__hover"></div>
                        </td>

                        <td class="DHondtTable__percentage DHondtTable__bloc tnum">
                            <?= number_format(100 * $result['votes'] / $totalVotes, 2, '.', ''); ?>%
                        </td>

                        <td class="DHondtTable__bloc tnum">
                            <?= number_format($result['votes'], 0, ".", " "); ?>
                        </td>

                        <?php foreach($result['rounds'] as $round): ?>
                            <td class="DHondtTable__bloc tnum<?= $round['elected'] ? " DHondtTable__elected" : ""; ?>">
                                <?= !empty($round['votes']) ? number_format($round['votes'], 0, ".", " ") : ''; ?>
                            </td>
                        <?php endforeach; ?>

                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php }

}
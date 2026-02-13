<?php
namespace Shared;

class CandidatesMasonryList extends \Base\Component{
    
    static function render(
        array $results,
        ?float $limit = INF,
    ){ ?>

        <details class="CandidatesMasonryList pre-hydration">
            <summary>
                <div class="summary-label closed-only">
                    <h3>Elected members</h3>
                    <span class="has-marker">Show all candidates</span>
                </div>
                <div class="summary-label open-only">
                    <h3>All candidate lists</h3>
                    <span class="has-marker">Show elected members only</span>
                </div>
                <div class="CandidatesMasonryList__collapsed-container closed-only">

                    <?php foreach($results as $result): 
                        $winners = array_filter($result['candidates'], fn($candidate) => $candidate['elected']);
                        if(empty($winners)) continue;
                    ?>
                        <div
                            class="CandidatesMasonryList__item" 
                            style="--row-span:<?= min($limit, count($winners)) + 2; ?>"
                            data-party="<?= $result['party']; ?>" 
                        >
                            <h4 class="CandidatesMasonryList__title bloc">
                                <span><?= $result['party']; ?></span>
                                <span><?= count($winners); ?></span>
                            </h4>
                            <table class="CandidatesMasonryList__table">
                                <tbody>
                                    <?php 
                                        $count = 0;
                                        foreach($winners as $candidate): 
                                            $count++;
                                            if($count > $limit): ?>
                                                <tr>
                                                    <td class="CandidatesMasonryList__limit-label has-marker"><?= count($winners) - $limit; ?> more</td>
                                                </tr>
                                            <?php break; ?>
                                            <?php else: ?>
                                                <tr>
                                                    <td title="<?= $candidate['name']; ?>" class="bloc"><?= $candidate['name']; ?></td>
                                                </tr>
                                            <?php endif;?>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php endforeach; ?>

                </div>
            </summary>

            <div class="CandidatesMasonryList__container">

                <?php foreach($results as $result): ?>
                    <div
                        class="CandidatesMasonryList__item" 
                        style="--row-span:<?= count($result['candidates']) + 2; ?>"
                        data-party="<?= $result['party']; ?>" 
                    >
                        <h4 class="CandidatesMasonryList__title bloc">
                            <span><?= $result['party']; ?></span>
                            <?php
                                $winners = count(array_filter($result['candidates'], fn($candidate) => $candidate['elected']));
                                if($winners > 0): ?>
                                    <span><?= $winners; ?></span>
                            <?php endif; ?>
                        </h4>
                        <table class="CandidatesMasonryList__table">
                            <colgroup><col /><col /></colgroup>
                            <tbody>
                                <?php foreach($result['candidates'] as $index => $candidate): ?>
                                    <tr<?= $candidate['elected'] ? ' class="CandidatesMasonryList__elected"' : ''; ?>>
                                        <td class="bloc tnum"><?= $index + 1; ?></td>
                                        <td title="<?= $candidate['name']; ?>" class="bloc"><?= $candidate['name']; ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endforeach; ?>

            </div>
        </details>
        
    <?php }

}
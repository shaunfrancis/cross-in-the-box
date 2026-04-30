<?php
namespace Shared;

class ElectedCandidatesMasonryList extends \Base\Component{
    
    static function render(
        array $results,
        ?float $limit = INF,
    ){ ?>

        <div class="ElectedCandidatesMasonryList pre-hydration">
                <h3>Elected members</h3>
                <div class="ElectedCandidatesMasonryList__collapsed-container closed-only">

                    <?php foreach($results as $result): 
                        $winners = array_filter($result['candidates'], fn($candidate) => $candidate['elected']);
                        usort($winners, fn ($a, $b) => $a['position'] <=> $b['position']);
                        if(empty($winners)) continue;
                    ?>
                        <div
                            class="ElectedCandidatesMasonryList__item" 
                            style="--row-span:<?= min($limit, count($winners)) + 2; ?>"
                            data-party="<?= $result['party']; ?>" 
                        >
                            <h4 class="ElectedCandidatesMasonryList__title bloc">
                                <span><?= $result['party']; ?></span>
                                <span><?= count($winners); ?></span>
                            </h4>
                            <table class="ElectedCandidatesMasonryList__table">
                                <tbody>
                                    <?php 
                                        $count = 0;
                                        foreach($winners as $candidate): 
                                            $count++;
                                            if($count > $limit): ?>
                                                <tr>
                                                    <td class="ElectedCandidatesMasonryList__limit-label"><?= count($winners) - $limit; ?> more</td>
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
        </div>
        
    <?php }

}
<?php
namespace Shared;
include_once './app/lib/shared.php';

class RegionBarGraph extends \Base\Component{
    
    static function render(
        array $results,                         // Result[]
        array $subtitles = [],                  // [subElectionId: string][]
        string $subElectionType = "separate",   // "separate" | "rounds"
        bool $withoutCandidateNames = FALSE,
        ?callable $subElectionSort = null,      // ([subid: any], [subid: any]) => number
    ){
        $subElectionSort ??= function($a, $b) {
            $intCompare = intval($b['subid']) - intval($a['subid']);
            if($intCompare == 0) return strnatcmp($a['subid'], $b['subid']);
            else return $intCompare;
        };
    ?>
            <?php
                switch($subElectionType){
                    case "rounds":
                        self::renderGraph(
                            results: $results, subElectionType: "rounds", withoutCandidateNames: $withoutCandidateNames
                        );
                        break;
                    case "fusion":
                        $fusionResults = combineFusionResults($results);
                        usort($fusionResults, fn($a, $b) => $b['votes'] - $a['votes']);
                        self::renderGraph(results: $fusionResults, subElectionType: "fusion");
                        break;
                    case "separate":
                    default:
                        $subElections = getResultsBySubElection($results);
                        usort($subElections, $subElectionSort);
                        foreach($subElections as $subElection){
                            self::renderGraph(
                                results: $subElection['results'], 
                                subElectionType: $subElectionType, 
                                title: $subtitles[$subElection['subid']] ?? NULL,
                                withoutCandidateNames: $withoutCandidateNames
                            );
                        }
                        break;
                }
            ?>

    <?php }

    static function renderGraph(array $results, string $subElectionType, ?string $title = NULL, ?bool $withoutCandidateNames = FALSE){ ?>
        <div class="RegionBarGraph pre-hydration<?= !empty($withoutCandidateNames) ? " without-candidate-names" : ""; ?>">
            <?php if($title): ?><h3><?= $title; ?></h3><?php endif; ?>
            <?php switch($subElectionType){
                case "rounds":
                    self::renderRoundsGraphRows($results, withoutCandidateNames: $withoutCandidateNames);
                    break;
                case "fusion":
                    self::renderFusionGraphRows($results, withoutCandidateNames: $withoutCandidateNames);
                    break;
                case "separate":
                default:
                    self::renderStandardGraphRows($results, withoutCandidateNames: $withoutCandidateNames);
                    break;
            } ?>
        </div>
    <?php }

    static function renderStandardGraphRows(array $results, ?bool $withoutCandidateNames = FALSE){
        $totalVotes = 0;
        foreach($results as $result){
            $totalVotes += $result['votes'];
        }

        foreach($results as $result){
            if($totalVotes > 0) $percentage = number_format(100 * $result['votes'] / $totalVotes, 2, '.', '');
            $elected = !empty($result['candidates'][0]['elected']);

            $votesValue = "";
            if($totalVotes > 0) $votesValue = number_format($result['votes'] ?? 0, 0, '.', ' ');
            else if($elected && count($results) === 1) $votesValue = "Unopposed";
            else if($elected) $votesValue = "Elected";

            ?>

            <div class="RegionBarGraph__row" data-party="<?= $result['party']; ?>">
                <div class="RegionBarGraph__party RegionBarGraph__bloc bloc">
                    <span><?= $result['party']; ?></span>
                    <div class="RegionBarGraph__hover"></div>
                </div>
                <?php if(!$withoutCandidateNames): ?>
                    <div
                        class="RegionBarGraph__candidate RegionBarGraph__bloc bloc" 
                        title="<?= $result['candidates'][0]['name']; ?>"
                    >
                        <?= $result['candidates'][0]['name']; ?>
                    </div>
                <?php endif; ?>
                <div class="RegionBarGraph__votes RegionBarGraph__bloc bloc tnum">
                    <?= $votesValue; ?>
                </div>

                 <div class="RegionBarGraph__percentage RegionBarGraph__bloc bloc tnum">
                    <?php if($totalVotes > 0) echo $percentage . "%"; ?>
                </div>
                
                <div class="RegionBarGraph__bar-container">
                    <div 
                        class="RegionBarGraph__bar" 
                        style="width: <?= $totalVotes > 0 ? ($percentage . "%") : ($elected ? "100%" : "0%"); ?>"
                    >
                    </div>
                </div>
            </div>
        <?php }

    }

    static function renderRoundsGraphRows(array $results, ?bool $withoutCandidateNames = FALSE){

        $resultsByCandidate = combineSubElections($results);
        $roundCount = count($resultsByCandidate[0]['results']);
        if($roundCount === 1) return self::renderStandardGraphRows($results, $withoutCandidateNames);

        $totalVotes = [];
        foreach($resultsByCandidate as &$candidate){
            ksort($candidate['results']);
            foreach($candidate['results'] as $index => $result){
                if(empty($totalVotes[$index])) $totalVotes[$index] = floatval($result['votes']);
                else $totalVotes[$index] += floatval($result['votes']);
            }
        };
        ?>

        <div class="RegionBarGraph__heading RegionBarGraph__row" data-max-rounds="<?= $roundCount + 2; ?>">
            <div class="RegionBarGraph__party RegionBarGraph__bloc bloc">
                Party
            </div>
            <div class="RegionBarGraph__candidate RegionBarGraph__bloc bloc">
                Candidate
            </div>
            <?php for($i = 1; $i <= count($resultsByCandidate[0]['results']); $i++): ?>
                <div class="RegionBarGraph__votes RegionBarGraph__bloc bloc">
                    Round <?= $i; ?>
                </div>
            <?php endfor; ?>
            <div class="RegionBarGraph__percentage RegionBarGraph__bloc bloc">
                Percentage
            </div>
        </div>
        <script>
            var parentContainer = document.querySelector('main section:has(> article > .RegionBarGraph)');
            if(parentContainer && parseInt(getComputedStyle(parentContainer).getPropertyValue('--max-rounds')) < <?= $roundCount + 2 ?>){
                parentContainer.style.setProperty("--max-rounds", <?= $roundCount + 2 ?>);
            }
        </script>

        <?php foreach($resultsByCandidate as $index => $result) : ?>
            <?php
                if(empty(end($totalVotes)) || end($totalVotes) == 0) $finalPercentage = 0;
                else $finalPercentage = number_format(
                    100 * (end($result['results'])['votes'] ?? 0) / end($totalVotes), 
                    2, '.', ''
                );
            ?>

            <div class="RegionBarGraph__row" data-party="<?= $result['party']; ?>">

                <div class="RegionBarGraph__party RegionBarGraph__bloc bloc">
                    <span><?= $result['party']; ?></span>
                    <div class="RegionBarGraph__hover"></div>
                </div>
                <?php if(!$withoutCandidateNames): ?>
                    <div
                        class="RegionBarGraph__candidate RegionBarGraph__bloc bloc" 
                        title="<?= $result['candidates'][0]['name']; ?>"
                    >
                        <?= $result['candidates'][0]['name']; ?>
                    </div>
                <?php endif; ?>

                <?php for($i = 1; $i <= count($resultsByCandidate[0]['results']); $i++): ?>
                    <?php $stillIn = !empty($result['results'][$i]); ?>
                    <div class="RegionBarGraph__votes RegionBarGraph__bloc bloc tnum <?= !$stillIn ? ' RegionBarGraph__eliminated' : ''; ?>">
                        <?php if($stillIn) echo number_format($result['results'][$i]['votes'], 0, '.', ' '); ?>
                    </div>
                <?php endfor; ?>
                
                <div class="RegionBarGraph__percentage RegionBarGraph__bloc bloc tnum<?= count($result['results']) !== $roundCount ? ' RegionBarGraph__eliminated' : ''; ?>">
                    <?= count($result['results']) === $roundCount ? $finalPercentage . "%" : ""; ?>
                </div>

                <div class="RegionBarGraph__bar-container" style="--rounds:<?= $roundCount + 2; ?>">
                    <?php 
                        unset($previousPercentage);
                        foreach($result['results'] as $i => $roundResult) :
                            $percentage = 100 * ($roundResult['votes'] / $totalVotes[$i]);
                        ?>
                            <div class="RegionBarGraph__bar" style="width:<?= $percentage - ($previousPercentage ?? 0); ?>%"></div>
                        <?php $previousPercentage = $percentage;
                    endforeach; ?>
                </div>
                    
            </div>

    <?php endforeach;
    }

    static function renderFusionGraphRows(array $results, ?bool $withoutCandidateNames = FALSE){
        $totalVotes = 0;
        foreach($results as $candidate){
            foreach($candidate['results'] as $result){
                $totalVotes += $result['votes'];
            }
        }

        foreach($results as $candidate){

            $fusionCount = count($candidate['results']);
            $isFusionCandidate = ($fusionCount > 1);
            $anyPartyElected = 0;

            foreach($candidate['results'] as &$result){
                if($totalVotes > 0){
                    $percentage = number_format(100 * $result['votes'] / $totalVotes, 2, '.', '');
                    $result['percentage'] = $percentage;
                }
                if(!empty($result['elected'])) $anyPartyElected = $result['elected'];
            }
            unset($result);

            for($i = $isFusionCandidate ? -1 : 0; $i < $fusionCount; $i++){
                $isTotalRow = ($i === -1);
                $result = !$isTotalRow ? $candidate['results'][$i] : ['votes' => $candidate['votes']];

                if($totalVotes > 0){
                    $percentage = $result['percentage'] ?? number_format(100 * $result['votes'] / $totalVotes, 2, '.', '');
                }
                $elected = $isFusionCandidate ? ($isTotalRow ? $anyPartyElected : FALSE) : !empty($result['elected']);

                $votesValue = "";
                if($totalVotes > 0) $votesValue = number_format($result['votes'] ?? 0, 0, '.', ' ');
                else if($elected && count($results) === 1) $votesValue = "Unopposed";
                else if($elected) $votesValue = "Elected";
                ?>

                <div
                    class="RegionBarGraph__row
                        <?php if($isTotalRow) : ?>RegionBarGraph__fusion-total-row<?php endif; ?>
                        <?php if($isFusionCandidate && !$isTotalRow) : ?>RegionBarGraph__fusion-hidden-row<?php endif; ?>"
                    data-party="<?= $isTotalRow ? $candidate['results'][0]['party'] : $result['party']; ?>"
                    <?php if($isTotalRow) : ?>data-fusion-count="<?= $fusionCount; ?>"<?php endif; ?>
                    data-fusion-group="<?= $candidate['candidates'][0]['name']; ?>"
                >
                    <div class="RegionBarGraph__party RegionBarGraph__bloc bloc">
                        <span><?= $isTotalRow ? $candidate['results'][0]['party'] . ' + ' . ($fusionCount-1) : $result['party']; ?></span>
                        <div class="RegionBarGraph__hover"></div>
                    </div>
                    <?php if(!$withoutCandidateNames): ?>
                        <div
                            class="RegionBarGraph__candidate RegionBarGraph__bloc bloc" 
                            title="<?= $candidate['candidates'][0]['name']; ?>"
                        >
                            <?= $candidate['candidates'][0]['name']; ?>
                        </div>
                    <?php endif; ?>
                    <div class="RegionBarGraph__votes RegionBarGraph__bloc bloc tnum">
                        <?= $votesValue; ?>
                    </div>

                    <div class="RegionBarGraph__percentage RegionBarGraph__bloc bloc tnum">
                        <?php if($totalVotes > 0) echo $percentage . "%"; ?>
                    </div>
                    
                    <?php if(!$isTotalRow || $totalVotes == 0) : ?>
                        <div class="RegionBarGraph__bar-container">
                            <div 
                                class="RegionBarGraph__bar" 
                                style="width: <?= $totalVotes > 0 ? ($percentage . "%") : ($elected ? "100%" : "0%"); ?>"
                            >
                            </div>
                        </div>
                    <?php else : ?>
                        <div class="RegionBarGraph__bar-container">
                            <?php foreach($candidate['results'] as $individualResult) : ?>
                                <?php if(empty($individualResult['percentage'])) continue; ?>
                                <div 
                                    class="RegionBarGraph__bar" 
                                    style="width: <?= $individualResult['percentage']; ?>%"
                                    data-party="<?= $individualResult['party']; ?>"
                                >
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php }
        }

    }

}
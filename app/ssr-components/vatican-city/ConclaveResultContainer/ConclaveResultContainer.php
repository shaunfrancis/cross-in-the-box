<?php 
namespace VaticanCity;

class ConclaveResultContainer extends \Base\Component{
    static function render (
        array $parties,
        string $election,
        array $title,                               // [string, string, string]
    ){ 
        $results = \API\ResultsService::call(["vatican", $election]);
        if(!empty($results['error'])) return;

        $winner = array_find($results, fn($result) => !empty($result['candidates'][0]['elected']));
        if(!empty($winner)) $winningParty = array_find($parties, fn($party) => $party['id'] == $winner['party']);
        
        $days = \Shared\getResultsBySubElection($results);
        ?>

        <div class="ConclaveResultContainer">

            <div class="ConclaveResultContainer__election-heading-container">
                <div class="ElectionResultContainer__title">
                    <h2>
                        <div class="ElectionResultContainer__title-text"><?= $title[0] ?? ''; ?></div>
                        <div class="ElectionResultContainer__subtitle-text">
                            <span><?= $title[1] ?? ''; ?></span>
                            <span><?= $title[2] ?? ''; ?></span>
                        </div>
                    </h2>
                </div>
                
                <div class="ConclaveResultContainer__pope-container">
                    <div class="ConclaveResultContainer__papal-name">
                        <?= $winningParty['titles'][0]['title'] ?: "No pope yet"; ?>
                    </div>
                    <?php if(!empty($winner['candidates'][0]['name'])) : ?>
                        <div class="ConclaveResultContainer__real-name">
                            <?= $winner['candidates'][0]['name']; ?>
                        </div>
                    <?php endif; ?>
                </div>
                    
            </div>

            <div class="ConclaveResultContainer__election-results-container">
                <?php foreach($days as $dayIndex => $day) :
                    usort($day['results'], fn($a,$b) => $a['candidates'][0]['elected'] - $b['candidates'][0]['elected']);
                    foreach($day['results'] as $index => $result) : ?>
                        
                        <div
                            class="ConclaveResultContainer__result-container<?= $day['subid'] % 2 ? "" : " ConclaveResultContainer__odd-day"; ?>"
                            data-seed="<?= sprintf("%s-%s-%s", $index, $dayIndex, $election); ?>"
                            data-elected="<?= !empty($result['candidates'][0]['elected']) ? "true" : "false"; ?>"
                            data-electors="<?= $result['votes']; ?>"
                        >
                            <div class="hover-popup hidden">
                                <?php if($result['candidates'][0]['elected']) : ?>
                                    <h3>Habemus Papam</h3>
                                    <?php if(!empty($winningParty)) : ?>
                                        <span><?= $winningParty['titles'][0]['title']; ?> was elected<span>
                                    <?php endif; ?>
                                <?php elseif($result['votes'] == 0) : // used in rare case that conclave is currently ongoing ?>
                                    <h3>Awaiting smoke</h3>
                                    <span>No pope has been elected yet</span>
                                <?php else : ?>
                                    <h3>Black smoke</h3>
                                    <span>No pope was elected</span>
                                <?php endif; ?>
                            </div>

                            <header class="ConclaveResultContainer__result-header">
                                <?php if($index == 0) : ?>
                                    <h3>Day <?= $day['subid']; ?></h3>
                                <?php endif; ?>
                            </header>

                            <?php include './public/maps/Vatican.svg'; ?>
                        </div>
                            
                    <?php endforeach;
                endforeach; ?>
            </div>
        </div>

    <?php }
}
<?php
namespace Shared;
include_once './app/lib/shared.php';

class PollTable extends \Base\Component{
    
    static function render(
        array $polls,           // Poll[]
        ?int $maxPolls = NULL,  // number
        ?bool $compact = FALSE, // bool
    ){ 
        $averages = getPollAverages($polls);
        if(!empty($maxPolls)) $polls = array_slice($polls, 0, $maxPolls);

        foreach($polls as &$poll){
            $start = new \DateTime($poll['start']);
            $end = new \DateTime($poll['end']);
            $thisYear = (new \DateTime())->format("Y");
            
            $poll['fieldwork'] = $start->format("j");

            if($start->format("m") != $end->format("m") || $start->format("d-m") == $end->format("d-m")){
                $poll['fieldwork'] .= " {$start->format("M")}";
            }

            if($start->format("Y") != $thisYear && $end->format("Y") == $thisYear) $poll['fieldwork'] .= " {$start->format("Y")}";

            if($start->format("d-m") != $end->format("d-m")){
                $poll['fieldwork'] .= " – {$end->format("j")} {$end->format("M")}";
            }
            if($end->format("Y") != $thisYear) $poll['fieldwork'] .= " {$end->format("Y")}";
        }

    ?>
        <div class="PollTable<?= $compact ? " compact" : ""; ?> pre-hydration">
            <div class="PollTable__row PollTable__header">
                <div class="PollTable__pollster">Pollster</div>
                <div class="PollTable__fieldwork">Fieldwork</div>
                <?php if(!$compact) : ?><div class="PollTable__sample">Sample</div><?php endif; ?>
                <div class="PollTable__figures">
                    <?php $i = 0; foreach($averages as $party => $average) : 
                        if(!empty($compact) && $i > 4) break;
                        $i++;
                    ?>
                        <div data-party="<?= $party; ?>">
                            <?= $party; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <?php foreach($polls as $poll) : ?>

                <div class="PollTable__row">
                
                    <div class="PollTable__pollster">
                        <span>
                            <?php if(!empty($poll['source'])) : ?>
                                <a href="<?= $poll['source']; ?>" target="_blank">
                                    <?= $poll['pollster'] ?? "Missing data"; ?>
                                </a>
                            <?php else : ?>
                                <?= $poll['pollster'] ?? "Missing data"; ?>
                            <?php endif; ?>
                        </span>
                        <?php if(!empty($poll['client']) && empty($compact)) : ?>
                            <span class="PollTable__client-span">, <?= $poll['client']; ?></span>
                        <?php endif; ?>
                    </div>

                    <div class="PollTable__fieldwork">
                        <?= $poll['fieldwork'] ?? "–"; ?>
                    </div>

                    <?php if(empty($compact)) : ?>
                        <div class="PollTable__sample">
                            <?= $poll['sample'] ?? "–"; ?>
                        </div>
                    <?php endif; ?>

                    <div class="PollTable__figures">

                        <?php $i = 0; foreach($averages as $party => $average) : 
                            if(!empty($compact) && $i > 4) break;
                            $i++;

                            $figure = array_find($poll['figures'], fn($f) => $f['party'] == $party);

                            $rawFigures = array_map(fn ($figure) => $figure['figure'], $poll['figures']);
                            $isLargest = !empty($figure['figure']) && $figure['figure'] == max($rawFigures);
                        ?>
                            <div<?php if($isLargest): ?> data-party="<?= $party; ?>"<?php endif; ?>>
                                <?php if(!empty($figure)) : ?>
                                    <?= $figure['figure']; ?>
                                <?php else : ?>
                                    <span style="color:var(--dark-default-color)">–</span>
                                <?php endif; ?>
                            </div>

                        <?php endforeach; ?>
                    </div>    
                </div>
            <?php endforeach; ?>
        </div>

    <?php }

}
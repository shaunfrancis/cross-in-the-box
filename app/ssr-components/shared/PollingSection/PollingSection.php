<?php
namespace Shared;
include_once './app/lib/shared.php';

class PollingSection extends \Base\Component{
    
    static function render(){ 
        $polls = \API\PollsService::call(["uk"]);
    ?>
        <div class="PollingSection">
            <div class="PollingSection__graph">
                <h2>Polling averages</h2>
                <?= \UK\PollGraph::show($polls, maxParties: 5, compact: TRUE); ?>
            </div>
            <div class="PollingSection__table">
                <h2>Latest polls</h2>
                <?= PollTable::show($polls, maxPolls: 7, compact: TRUE); ?>
            </div>
        </div>

    <?php }

}
<?php
    $_title[] = "Opinion polling";
    $_description[] = "See the latest opinion polls for general elections in the United Kingdom.";

    $polls = \API\PollsService::call(["uk"]);
?>
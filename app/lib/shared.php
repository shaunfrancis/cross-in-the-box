<?php namespace Shared;
/* Collection of reusable helper functions */

/* Duplicated in shared/lib.js */
function dateToLongDate($dateString, $includeYear = NULL){
    $date = date_parse($dateString);
    if(!empty($date['errors'])) return $dateString;

    if(is_null($includeYear)) $includeYear = $date['year'] != (new \DateTime())->format('Y');

    $ordinalIndicator = "th";
    if(!in_array($date['day'], [11,12,13])) switch($date['day'] % 10){
        case 1: $ordinalIndicator = "st"; break;
        case 2: $ordinalIndicator = "nd"; break;
        case 3: $ordinalIndicator = "rd";
    }

    $month = ["January","February","March","April","May","June","July","August","September","October","November","December"][$date['month'] - 1];

    $longDate = $date['day'] . $ordinalIndicator . " " . $month;
    if($includeYear) $longDate .= " " . $date['year'];
    return $longDate;
}
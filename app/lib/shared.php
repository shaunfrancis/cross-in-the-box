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

function getResultsBySubElection(array $results){
    $subElections = []; // {subid : number, results : AnonymousResult[]}[]

    $subids = array_unique(
        array_map(function($result){
            return intval($result['subid'] ?? 0);
        }, $results)
    );
    sort($subids, SORT_NUMERIC);
    $subids = array_reverse($subids);

    foreach($subids as $subid){
        $subElections[] = [
            "subid" => $subid,
            "results" => array_filter( $results, function($result) use ($subid){
                return (!empty($result['subid']) ? $result['subid'] : 0) == ($subid ?? 0);
            })
        ];
    };

    return $subElections;
}

    
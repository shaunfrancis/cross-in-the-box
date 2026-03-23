<?php namespace Shared;
/* Collection of reusable helper functions */

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

// Combine multiple results for the same party into one result with multiple candidates
// Automatically run on results API calls
function combineCandidates(array $results){ // {...Result, candidates: {name: string, position: int}[] }[]
    $combinedResults = [];

    $resultsByRegion = [];
    foreach($results as $result){
        $resultsByRegion[$result['id'] ?? 0][] = $result;
    }

    foreach($resultsByRegion as $regionResults){
        $combinedRegionResults = [];
        foreach($regionResults as $result){
            $party = $result['party'];

            $candidateArray = [
                'name' => $result['candidate'], 
                'position' => $result['candidate_position'] ?? 0,
                'elected' => $result['elected'],
            ];

            $resultExists = FALSE;
            foreach($combinedRegionResults as &$combinedResult){
                if($combinedResult['result_id'] == $result['result_id']){
                    $resultExists = TRUE;
                    $combinedResult['candidates'][] = $candidateArray;
                    break;
                }
            }
            if(!$resultExists){
                $result['candidates'] = [$candidateArray];
                unset($result['candidate']);
                unset($result['candidate_position']);
                unset($result['elected']);
                $combinedRegionResults[] = $result;
            }

        }

        array_push($combinedResults, ...$combinedRegionResults);
    }
    foreach($combinedResults as &$combinedResult) unset($combinedResult['result_id']);

    return $combinedResults;
}

/* Duplicated in shared/lib.js */
// Split a set of results into an array of [subid, results]
function getResultsBySubElection(array $results){ // {subid : number, results : Result[]}[]
    $subElections = [];

    $subids = array_unique(
        array_map(function($result){
            return intval($result['subid'] ?? 0);
        }, $results)
    );
    sort($subids, SORT_NUMERIC);

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

/* Duplicated in shared/lib.js */
// Combine all results for the same candidate name and party from different election subIds into one array for each candidate
// This only works if there is only one candidate per result!
function combineSubElections(array $results){ // {id: string, candidate: {name: string, position: int}, results: {votes: int, elected: bool} }[]
    $combinedResults = [];

    $resultsByRegion = [];
    foreach($results as $result){
        $resultsByRegion[$result['id'] ?? 0][] = $result;
    }

    foreach($resultsByRegion as $regionId => $regionResults){
        $combinedRegionResults = [];
        foreach($regionResults as $result){
            $party = $result['party'];
            $candidate = $result['candidates'][0];

            $resultArray = array(
                'votes' => $result['votes'],
                'elected' => $candidate['elected'],
            );

            $resultExists = FALSE;
            foreach($combinedRegionResults as &$combinedResult){
                if($combinedResult['party'] == $result['party'] && $combinedResult['candidates'][0]['name'] == $candidate['name']){
                    $resultExists = TRUE;
                    $combinedResult['results'][$result['subid']] = $resultArray;
                    break;
                }
            }
            if(!$resultExists){
                unset($result['candidates'][0]['elected']);
                $combinedRegionResults[] = array(
                    'id' => $regionId,
                    'party' => $result['party'],
                    'candidates' => $result['candidates'],
                    'results' => [($result['subid'] ?? 0) => $resultArray]
                );
                unset($result['subid']);
            }
        }

        array_push($combinedResults, ...$combinedRegionResults);
    }

    return $combinedResults;
}
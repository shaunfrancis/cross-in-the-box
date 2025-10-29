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
                        <?= $winningParty['title'] ?: "No pope yet"; ?>
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
                                        <span><?= $winningParty['title']; ?> was elected<span>
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

/*

import { Fragment, useEffect, useRef, useState } from "react";
import styles from './ConclaveResultContainer.module.css';

import VaticanConclaveMap from "src/components/maps/VaticanConclaveMap";

import HoverPopup from "../../../shared/HoverPopup/HoverPopup";
import { AnonymousResult, Party, Region, Result, Update } from "src/Types";
import { Endpoint } from "src/constants/shared";
import { getResultsBySubElection, useOnScreen } from "src/lib/shared";

export default function ConclaveResultContainer( 
    { election, title = [election, "Papal", "Conclave"], preloadedResults, regions, parties } : 
    { 
        election : string,
        title? : string[],
        preloadedResults? : Result[],
        regions : Region[],
        parties : Party[],
    }
){
    const mapHoverFun = (active : boolean = false, event?: MouseEvent, elected?: boolean) => {
        const newPopupState = {...popupState, visible: active};
        if(event) newPopupState.coordinates = [event.clientX, event.clientY];
        newPopupState.elected = elected;
        setPopupState(newPopupState);
    };


    const container = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(container);
    const loadingComplete = useRef<boolean>(false);
    const winFormula = (results : Result[]) => results.filter(r => r.elected);
    
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], elected?: boolean}>( { visible: false, coordinates:[0,0] } );
    let [results, setResults] = useState<Result[]>([]);

    useEffect( 

    return ( <>
        <div class='container']} ref={container}>

            <div class="election-heading-container"]}>
                <div class="election-title"]}>
                    <h2>
                        <div class="election-title-text"]}>{title[0]}</div>
                        <div class="election-subtitle-text"]}>
                            <span>{title[1]}</span><br/>
                            <span>{title[2]}</span>
                        </div>
                    </h2>
                </div>
                
                <div class="pope-container"]}>
                    <div className={papalNameClasses.join(" ")}>
                        {results.length > 0 ? (winningPapalName || "No Pope Yet") : ""}
                    </div>
                    <div class="real-name"]}>
                        {winningCandidate}
                    </div>
                </div>
                    
            </div>

            <div class="election-results-container"]}>
                {
                    getResultsBySubElection(results)
                        .sort( (a,b) => a.subid - b.subid )
                        .map( (day : { subid: number; results: AnonymousResult[] }, dayIndex) => {
                            day.results.sort( (a,b) => Number(a.elected) - Number(b.elected) );
                            return (<Fragment key={dayIndex}>
                                {
                                    day.results.map( (result, i) => {
                                        return (
                                            <div class="result-container"] + (day.subid % 2 ? "" : " " + styles["odd-day"])} key={i}>
                                                <header class="result-header"]}>
                                                    { i === 0 &&
                                                        <h3>Day {day.subid}</h3>
                                                    }
                                                </header>
                                                <VaticanConclaveMap
                                                    seed={i + "-" + dayIndex + "-" + election}
                                                    hoverFun={mapHoverFun} 
                                                    elected={result.elected} 
                                                    electors={result.votes} 
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </Fragment>)
                        })
                }
            </div>

            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.elected)}
            </HoverPopup>
        </div>
    </> )
}*/
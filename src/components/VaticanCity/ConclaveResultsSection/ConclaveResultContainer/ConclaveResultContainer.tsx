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

    const container = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(container);
    const loadingComplete = useRef<boolean>(false);
    const winFormula = (results : Result[]) => results.filter(r => r.elected);
    
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], elected?: boolean}>( { visible: false, coordinates:[0,0] } );
    let [results, setResults] = useState<Result[]>([]);

    useEffect( () => {
        if( loadingComplete.current || !onScreen || parties.length == 0 || regions.length == 0 || (preloadedResults && preloadedResults.length == 0)) return;
        loadingComplete.current = true;
        
        const getResults = async () => {

            let resultData : Result[];
            if(!preloadedResults) resultData = await fetch(Endpoint + '/results/vatican/' + election).then( res => res.json() );
            else resultData = preloadedResults;
            setResults(resultData);
        };
        getResults();
    }, [onScreen, preloadedResults, parties, regions]);

    const mapHoverFun = (active : boolean = false, event?: MouseEvent, elected?: boolean) => {
        const newPopupState = {...popupState, visible: active};
        if(event) newPopupState.coordinates = [event.clientX, event.clientY];
        newPopupState.elected = elected;
        setPopupState(newPopupState);
    };

    const popupContent = (elected? : boolean) => {

        if(elected){
            const partyId = results.find(result => result.elected)?.party;
            const party = parties.find(party => party.id === partyId);
            if(party){
                return ( <>
                    <h3>Habemus Papam</h3>
                    <span>{party.title} was elected</span>
                </> )
            }
        }
        else if(results[0]?.votes === 0){ // used in rare case that conclave is currently ongoing
            return ( <>
                <h3>Awaiting Smoke</h3>
                <span>No pope has been elected yet</span>
            </> )
        }
        return ( <>
            <h3>Black Smoke</h3>
            <span>No pope was elected</span>
        </> )
    }

    const winningResult = winFormula(results);
    const winningCandidate = winningResult[0]?.candidate;
    const winningPapalName = parties.find(party => party.id === winningResult[0]?.party)?.title;

    const papalNameClasses = [styles["papal-name"]];
    if(results.length === 0) papalNameClasses.push(styles["loading"]);
    else if(!winningPapalName) papalNameClasses.push(styles["awaiting"]);

    return ( <>
        <div className={styles['container']} ref={container}>

            <div className={styles["election-heading-container"]}>
                <div className={styles["election-title"]}>
                    <h2>
                        <div className={styles["election-title-text"]}>{title[0]}</div>
                        <div className={styles["election-subtitle-text"]}>
                            <span>{title[1]}</span><br/>
                            <span>{title[2]}</span>
                        </div>
                    </h2>
                </div>
                
                <div className={styles["pope-container"]}>
                    <div className={papalNameClasses.join(" ")}>
                        {results.length > 0 ? (winningPapalName || "No Pope Yet") : ""}
                    </div>
                    <div className={styles["real-name"]}>
                        {winningCandidate}
                    </div>
                </div>
                    
            </div>

            <div className={styles["election-results-container"]}>
                {
                    getResultsBySubElection(results)
                        .sort( (a,b) => a.subid - b.subid )
                        .map( (day : { subid: number; results: AnonymousResult[] }, dayIndex) => {
                            day.results.sort( (a,b) => Number(a.elected) - Number(b.elected) );
                            return (<Fragment key={dayIndex}>
                                {
                                    day.results.map( (result, i) => {
                                        return (
                                            <div className={styles["result-container"] + (day.subid % 2 ? "" : " " + styles["odd-day"])} key={i}>
                                                <header className={styles["result-header"]}>
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
}
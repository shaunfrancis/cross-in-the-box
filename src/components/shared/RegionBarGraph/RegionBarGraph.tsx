import { AnonymousResult, Party } from 'src/Types';
import styles from './RegionBarGraph.module.css';
import { DefaultParty } from 'src/constants/shared';
import { addThousandsSpacing, getResultsByCandidate, getResultsBySubElection } from 'src/lib/shared';
import { useEffect } from 'react';

export default function RegionBarGraph( 
    { title, results, parties, subElectionType = "separate" } : 
    { title : string[], results : AnonymousResult[], parties : Party[], subElectionType? : "separate" | "rounds" } 
){
    while(title.length < 3) title.push("");

    //set --max-rounds on container
    useEffect( () => {
        if(subElectionType == "rounds"){
            const resultsByCandidate = getResultsByCandidate(results);
            const roundCount = resultsByCandidate[0].results.length;

            const parentContainer = document.querySelector('*:has(> .' + styles["container"] + ')');
            if(parentContainer){
                if( parseInt(getComputedStyle(parentContainer as HTMLElement).getPropertyValue('--max-rounds')) < roundCount + 2 ){
                    (parentContainer as HTMLElement).style.setProperty("--max-rounds", (roundCount + 2).toString() );
                }
            }
        }
    }, []);

    const graphContainer = (givenResults : AnonymousResult[], title? : string, key? : number) => {
        let rows : JSX.Element;
        if(subElectionType == "separate") rows = standardGraphRows(givenResults);
        else rows = roundsGraphRows(givenResults);
        
        return (
            <div key={key || 0} className={styles["bar-graph-container"]}>
                {title && <h3>{title}</h3>}
                {rows}
            </div>
        );
    }

    const standardGraphRows = (givenResults : AnonymousResult[]) => {
        let totalVotes = 0;
        givenResults.forEach( result => {
            totalVotes += result.votes;
        });
        
        return (<>
            {
                givenResults.map( (result, index) => {
                    const percentage = (100 * result.votes / totalVotes).toFixed(2);
                    const party = parties.find( p => p.id == result.party ) || DefaultParty;
                    const bgColor = party.color || "var(--default-color)";

                    return ( 
                        <div key={index} className={styles["bar-graph-row"]}>

                            <div 
                                className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} 
                                style={{background: bgColor, color: party.textColor}}
                            >
                                <span>{party.displayId || party.id}</span>
                                <div className={styles["bar-detail-hover"]}>{party.title}</div>
                            </div>

                            <div 
                                className={styles["bar-graph-candidate"] + " " + styles["bar-graph-bloc"]}
                                style={{background: bgColor, color: party.textColor}}
                            >
                                {result.candidate}
                            </div>

                            <div 
                                className={styles["bar-graph-votes"] + " " + styles["bar-graph-bloc"]}
                                style={{background: bgColor, color: party.textColor}}
                            >
                                {totalVotes > 0 && addThousandsSpacing(result.votes)}
                            </div>
                            
                            <div 
                                className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]}
                                style={{background: bgColor, color: party.textColor}}
                            >
                                {totalVotes > 0 && percentage + "%"}
                            </div>
                            <div className={styles["bar-graph-bar-container"]}>
                                <div 
                                    className={styles["bar-graph-bar"]}
                                    style={{background: bgColor, width: totalVotes > 0 ? percentage + "%" : "0%"}}
                                ></div>
                            </div>
                                
                        </div>
                    )
                })
            }
        </>);
    }

    const roundsGraphRows = (givenResults : AnonymousResult[]) => {
        const resultsByCandidate = getResultsByCandidate(results);
        if(resultsByCandidate[0].results.length == 1) return standardGraphRows(givenResults);
        const roundCount = resultsByCandidate[0].results.length;

        let totalVotes : number[] = [];
        resultsByCandidate.forEach( candidate => {
            candidate.results.forEach( (result, index) => {
                if(!totalVotes[index]) totalVotes[index] = result.votes;
                else totalVotes[index] += result.votes;
            });
        });

        const rows : React.ReactNode[] = [(
            <div key="heading" className={styles["bar-graph-row"] + " " + styles["bar-graph-heading"]}>
                <div className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]}>
                    Party
                </div>
                <div className={styles["bar-graph-candidate"] + " " + styles["bar-graph-bloc"]}>
                    Candidate
                </div>
                {
                    resultsByCandidate[0].results.map( (_, index) => (
                        <div key={index} className={styles["bar-graph-votes"] + " " + styles["bar-graph-bloc"]}>
                            Round {index + 1}
                        </div>
                    ))
                }
                <div className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]}>
                    Percentage
                </div>
            </div>
        )];

        resultsByCandidate.forEach( (candidate, index) => {
            const party = parties.find( p => p.id == candidate.party ) || DefaultParty;
            const bgColor = party.color || "var(--default-color)";

            const finalPercentage = (100 * (candidate.results[roundCount - 1]?.votes / totalVotes[roundCount - 1] || 0)).toFixed(2);

            rows.push((
                <div key={index} className={styles["bar-graph-row"]}>

                    <div 
                        className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} 
                        style={{background: bgColor, color: party.textColor}}
                    >
                        <span>{party.displayId || party.id}</span>
                        <div className={styles["bar-detail-hover"]}>{party.title}</div>
                    </div>

                    <div 
                        className={styles["bar-graph-candidate"] + " " + styles["bar-graph-bloc"]}
                        style={{background: bgColor, color: party.textColor}}
                    >
                        {candidate.name}
                    </div>

                    {
                        resultsByCandidate[0].results.map( (_, i) => {
                            const stillIn = resultsByCandidate[index].results[i];
                            return (
                                <div 
                                    key={index + "-" + i}
                                    className={styles["bar-graph-votes"] + " " + styles["bar-graph-bloc"]}
                                    style={{background: bgColor, color: party.textColor, opacity: !stillIn ? 0.5 : undefined}}
                                >
                                    {stillIn && addThousandsSpacing(resultsByCandidate[index].results[i].votes)}
                                </div>
                            )
                        })
                    }
                    
                    <div 
                        className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]}
                        style={{background: bgColor, color: party.textColor, opacity: candidate.results.length != roundCount ? 0.5 : undefined}}
                    >
                        {candidate.results.length == roundCount && finalPercentage + "%"}
                    </div>

                    <div 
                        className={styles["bar-graph-bar-container"]}
                        style={{'--rounds' : roundCount + 2} as React.CSSProperties}
                    >
                        {
                            candidate.results.map( (result, index) => {
                                const percentage = 100 * (
                                    result.votes / totalVotes[index] 
                                    -(candidate.results[index-1]?.votes / totalVotes[index-1] || 0) );
                                return (
                                    <div 
                                        key={"bar-" + index}
                                        className={styles["bar-graph-bar"]}
                                        style={{background: bgColor, width: percentage + "%"}}
                                    ></div>
                                )
                            })
                        }
                    </div>
                        
                </div>
            ));
        });

        return (<>{rows}</>);
    }

    const graphNodes : React.ReactNode[] = [];

    if(subElectionType == "separate"){
        const subElections = getResultsBySubElection(results);
        subElections.forEach( subElection => {
            graphNodes.push( graphContainer(subElection.results, "", subElection.subid) );
        });
    }

    else if(subElectionType == "rounds") graphNodes.push( graphContainer(results, "") );

    return (
        <article className={styles["container"]}>
            <h2>{title[0]} {title[1] + (title[1].slice(-1) == "-" ? "" : " ") + title[2]}</h2>
            {graphNodes}
        </article>
    )
}
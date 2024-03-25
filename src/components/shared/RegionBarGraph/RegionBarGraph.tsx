import { AnonymousResult, Party } from 'src/Types';
import styles from './RegionBarGraph.module.css';
import { DefaultParty } from 'src/Constants';
import { addThousandsSpacing } from 'src/lib/shared';

export default function RegionBarGraph( 
    { title, results, parties } : { title : string[], results : AnonymousResult[], parties : Party[] } 
){
    while(title.length < 3) title.push("");

    let totalVotes = 0;
    results.forEach( result => {
        totalVotes += result.votes;
    });

    return (
        <section className={styles["container"]}>
            <h2>{title[0]} {title[1]} {title[2]}</h2>
            <div className={styles["bar-graph-container"]}>
            {
                results.map( (result, index) => {
                    const percentage = (100 * result.votes / totalVotes).toFixed(2);
                    const party = parties.find( p => p.id == result.party ) || DefaultParty;
                    const bgColor = party.color || "#AAA";

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
                                {addThousandsSpacing(result.votes)}
                            </div>
                            <div 
                                className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]}
                                style={{background: bgColor, color: party.textColor}}
                            >
                                {percentage}%
                            </div>
                            <div className={styles["bar-graph-bar-container"]}>
                                <div 
                                    className={styles["bar-graph-bar"] + " " + styles["bar-graph-bloc"]}
                                    style={{background: bgColor, width: percentage + "%"}}
                                ></div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}
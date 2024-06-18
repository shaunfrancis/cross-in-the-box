import { DefaultParty } from '../../../Constants';
import { AnonymousResult, Party } from '../../../Types';
import styles from './PopupBarGraph.module.css';

export default function PopupBarGraph( { results, parties, raw = false, goal } : 
    { results : AnonymousResult[], parties : Party[], raw?: boolean, goal?: number }
){

    let totalVotes = 0;
    results.forEach( result => totalVotes += result.votes );

    return ( 
        <div className={styles["bar-graph-container"]}>
            {
                results.map( (result, index) => {
                    const percentage = totalVotes == 0 ? 0 : (100 * result.votes / totalVotes).toFixed(2);
                    const party = parties.find( party => party.id == result.party ) || DefaultParty;
                    const bgColor = party.color || "var(--default-color)";

                    return (
                        <div key={index} className={styles["bar-graph-row"]}>

                            <div className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} style={{background: bgColor, color: party.textColor}}>
                                {party.displayId || party.id}
                            </div>

                            <div className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]} style={{background: bgColor, color: party.textColor}}>
                                {totalVotes > 0 && (raw ? result.votes : percentage + "%")}
                            </div>

                            <div className={styles["bar-graph-bar-container"]}>
                                <div
                                    className={styles["bar-graph-bar"] + " " + styles["bar-graph-bloc"]}
                                    style={{background: bgColor, width: percentage + "%"}}
                                ></div>
                                { goal &&
                                    <div className={styles["bar-graph-goal"]} style={{left: 100*goal + "%"}}></div>
                                }
                            </div>

                        </div>
                    )
                })
            }
        </div>
    );
}
import { DefaultParty } from '../../../constants/shared';
import { AnonymousResult, Party } from '../../../Types';
import styles from './PopupBarGraph.module.css';

export default function PopupBarGraph( { results, parties, raw = false, goal, title } : 
    { results : AnonymousResult[], parties : Party[], raw?: boolean, goal?: number, title?: string }
){

    let totalVotes = 0;
    results.forEach( result => totalVotes += result.votes );

    return ( <>
        { title &&
            <div className={styles["title"]}>{title}</div>
        }
        <div className={styles["bar-graph-container"]}>
            {
                results.map( (result, index) => {
                    const percentage = totalVotes == 0 ? 0 : (100 * result.votes / totalVotes).toFixed(2);
                    const party = parties.find( party => party.id == result.party ) || DefaultParty;
                    const bgColor = party.color || "var(--default-color)";

                    let numberValue = "";
                    if(totalVotes > 0) numberValue = raw ? result.votes.toString() : percentage + "%";
                    // else if(result.elected && results.length == 1) numberValue = "Unopposed";
                    else if(result.elected) numberValue = "Elected";

                    return (
                        <div key={index} className={styles["bar-graph-row"]}>

                            <div className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} style={{background: bgColor, color: party.textColor}}>
                                {party.displayId || party.id}
                            </div>

                            <div className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]} style={{background: bgColor, color: party.textColor}}>
                                {numberValue}
                            </div>

                            <div className={styles["bar-graph-bar-container"]}>
                                <div
                                    className={styles["bar-graph-bar"] + " " + styles["bar-graph-bloc"]}
                                    style={{
                                        background: bgColor, 
                                        width: totalVotes > 0 ? percentage + "%" : (result.elected ? "100%" : "0%")

                                    }}
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
    </> );
}
import { Party, Result } from '../../../types/types';
import styles from './PopupBarGraph.module.css';

export default function PopupBarGraph( { results, parties } : { results : Result[], parties : Party[] } ){

    let totalVotes = 0;
    results.forEach( result => totalVotes += result.votes );

    return ( 
        <div className={styles["bar-graph-container"]}>
            {
                results.map( result => {
                    const percentage = (100 * result.votes / totalVotes).toFixed(2);
                    const color = parties.find( party => party.id == result.party )?.color || "#AAA";

                    return (
                        <div className={styles["bar-graph-row"]}>

                            <div className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} style={{background: color}}>
                                {result.party.toUpperCase()}
                            </div>

                            <div className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]} style={{background: color}}>
                                {percentage}%
                            </div>

                            <div className={styles["bar-graph-bar-container"]}>
                                <div 
                                    className={styles["bar-graph-bar"] + " " + styles["bar-graph-bloc"]}
                                    style={{background: color, width: percentage + "%"}}
                                ></div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    );
}
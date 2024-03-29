import { DefaultParty } from '../../../Constants';
import { Party, Result } from '../../../Types';
import styles from './PopupBarGraph.module.css';

export default function PopupBarGraph( { results, parties } : { results : Result[], parties : Party[] } ){

    let totalVotes = 0;
    results.forEach( result => totalVotes += result.votes );

    return ( 
        <div className={styles["bar-graph-container"]}>
            {
                results.map( (result, index) => {
                    const percentage = (100 * result.votes / totalVotes).toFixed(2);
                    const party = parties.find( party => party.id == result.party ) || DefaultParty;
                    const bgColor = party.color || "var(--default-color)";

                    return (
                        <div key={index} className={styles["bar-graph-row"]}>

                            <div className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} style={{background: bgColor, color: party.textColor}}>
                                {party.displayId || party.id}
                            </div>

                            <div className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]} style={{background: bgColor, color: party.textColor}}>
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
    );
}
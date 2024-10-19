import { Party } from 'src/Types';
import styles from './ElectionSummaryBars.module.css';

export default function ElectionSummaryBars( 
    { data } : { data : {candidate? : string, party : Party, count : number, ghostCount? : number, displayCount?: string}[] }
){

    const bars : React.ReactNode[] = [];

    const total = data.reduce( (accumulator, row) => accumulator + row.count + (row.ghostCount || 0), 0 ) || 1;
    const maxCount = data.reduce( (accumulator, row) => {
        return Math.max(accumulator, (row.count + (row.ghostCount || 0)));
    }, 0);


    /*

    m = 100 * (count + ghost) / total

    (100 * count / m) + (100 * ghost / m)
    = 100 * (count + ghost) / m

    */

    data.forEach( (row,index) => {

        const bar = (
            <div 
                className={styles["summary-bar"]}
                style={{
                    width: (100 * row.count / maxCount) + "%",
                    background: row.party.color || "var(--default-color)", 
                    color: row.party.textColor
                }}
            >
                <span className={styles["summary-bar-party"]}>{row.candidate || row.party.displayId || row.party.id}</span>
                <span className={styles["summary-bar-count"]}>{row.displayCount || (row.count + (row.ghostCount || 0))}</span>
            </div>
        );

        const ghostBar = (
            <div 
                className={styles["summary-ghost-bar"]}
                style={{
                    width: (100 * (row.ghostCount || 0) / maxCount) + "%",
                    background: row.party.color || "var(--default-color)", 
                    color: row.party.textColor
                }}
            >
            </div>
        );

            
        bars.push(
            <div
                key={index} 
                className={styles["summary-bar-container"]}
            >
                {bar}
                {row.ghostCount != 0 && ghostBar}
            </div>
        );
    } );


    return ( 
        <div className={styles["summary-bars-container"]} style={{width: 100 * maxCount / total + "%"}}>
            {bars}
        </div>
    );
}
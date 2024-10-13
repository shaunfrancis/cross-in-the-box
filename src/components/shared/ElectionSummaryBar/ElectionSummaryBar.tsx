import styles from './ElectionSummaryBar.module.css';
import { Party } from '../../../Types';

export default function ElectionSummaryBar( 
    { data } : { data : {candidate? : string, party : Party, count : number, displayCount?: string}[] }
){

    const segments : React.ReactNode[] = [];
    const total = data.reduce( (accumulator, row) => accumulator + row.count, 0 ) || 1;

    data.forEach( (row,index) => {

        const segment = (
            <div 
                key={index} 
                className={styles["summary-segment"]}
                style={{
                    width: (100 * row.count / total) + "%",
                    background: row.party.color || "var(--default-color)", 
                    color: row.party.textColor
                }}
            >
                <span className={styles["summary-segment-party"]}>{row.candidate || row.party.displayId || row.party.id}</span>
                <span className={styles["summary-segment-count"]}>{row.displayCount || row.count}</span>
            </div>
        );
            
        segments.push(segment);
    } );


    return ( 
        <div className={styles["summary-bar-container"]}>
            {segments}
        </div>
    );
}
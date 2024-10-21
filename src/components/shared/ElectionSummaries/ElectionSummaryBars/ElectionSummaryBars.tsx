import { Party } from 'src/Types';
import styles from './ElectionSummaryBars.module.css';

interface BarData{
    candidate? : string, 
    party : Party, 
    count : number, 
    ghostCount? : number, 
    displayCount?: string
}

export default function ElectionSummaryBars( 
    { 
        data, 
        total = data.reduce( (accumulator, row) => accumulator + row.count + (row.ghostCount || 0), 0 ) || 1,
        comboFunction = (d) => { const comboBars : BarData[][] = []; d.forEach( row => comboBars.push([row]) ); return comboBars }
    } : 
    { 
        data : BarData[],
        total? : number,
        comboFunction? : (d : BarData[]) => BarData[][]
    }
){

    const barNodes : React.ReactNode[] = [];

    const comboBars = comboFunction(data);

    const maxCount = comboBars.reduce( (accumulator, rows) => {
        return Math.max( accumulator, rows.reduce((a,r) => a + r.count + (r.ghostCount || 0) , 0) );
    }, 0);

    comboBars.forEach( (rows,index) => {

        const segments : React.ReactNode[] = [];

        rows.forEach( (row, rowIndex) => {
            const barWidth = (100 * row.count / maxCount);
            const count = rows.reduce((a,r) => a + r.count + (r.ghostCount || 0), 0);

            const bar = barWidth > 0 && (
                <div 
                    key={"segment-" + rowIndex}
                    className={styles["summary-segment"]}
                    style={{
                        width: barWidth + "%",
                        background: row.party.color || "var(--default-color)", 
                        color: row.party.textColor
                    }}
                >
                    {rowIndex == 0 && <>
                        <span className={styles["summary-bar-party"]}>{row.candidate || row.party.displayId || row.party.id}</span>
                        <span className={styles["summary-bar-count"]}>{count}</span>
                    </> }
                </div>
            );
            segments.push(bar);
        } );
        rows.forEach( (row, rowIndex) => {

            const ghostBarWidth = (100 * (row.ghostCount || 0) / maxCount);
            const ghostBar = ghostBarWidth > 0 && (
                <div 
                    key={"ghost-" + rowIndex}
                    className={styles["summary-ghost-segment"]}
                    style={{
                        width: ghostBarWidth + "%",
                        background: row.party.color || "var(--default-color)", 
                        color: row.party.textColor
                    }}
                >
                </div>
            );
            segments.push(ghostBar);
        } );

            
        barNodes.push(
            <div
                key={index} 
                className={styles["summary-bar-container"]}
            >
                {segments}
            </div>
        );
    } );


    return ( 
        <div className={styles["summary-bars-container"]} style={{width: 100 * maxCount / total + "%"}}>
            {barNodes}
        </div>
    );
}
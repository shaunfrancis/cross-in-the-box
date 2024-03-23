import { useState } from 'react';
import styles from './ElectionSummaryBlocs.module.css';
import { Party } from '../../../Types';

export default function ElectionSummaryBlocs( 
    { data, rowLength, hoverState } : 
    { 
        data : {party : Party, count : number}[], 
        rowLength : number, 
        hoverState? : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    }
){
    const [hover, setHover] = hoverState ? hoverState : useState<boolean>(false);

    const shouldShowOther = data.length > rowLength;
    let totalOther = 0;
    if(shouldShowOther){
        data.slice(rowLength - 1).forEach( result => {
            totalOther += result.count;
        });
    }

    const rows : React.ReactNode[] = [];

    for(let i = 0; i < (shouldShowOther ? (data.length + 1) : data.length) / rowLength; i++){
        const blocs : React.ReactNode[] = [];
        for(let j = 0; j < rowLength; j++){
            const position = (shouldShowOther && (i > 0 || j >= 4)) ? i*rowLength + j - 1 : i*rowLength + j;
            if(position >= data.length - 1 + (shouldShowOther ? 1 : 0)) break;

            if(i == 0 && j == 4){
                blocs.push(
                    <div key={-1}
                        className={styles["summary-bloc"] + " " + styles["other-bloc"]}
                        onMouseOver={() => {setHover(true)}}
                        onMouseOut={() => {setHover(false)}}
                    >
                        <span className={styles["summary-bloc-party"]}>Other</span>
                        <span className={styles["summary-bloc-count"]}>{totalOther}</span>
                    </div>
                );
            }
            else{
                blocs.push(
                    <div key={position} className={styles["summary-bloc"]} style={{background: data[position].party.color || "#AAA", color: data[position].party.textColor}}>
                        <span className={styles["summary-bloc-party"]}>{data[position].party.displayId || data[position].party.id}</span>
                        <span className={styles["summary-bloc-count"]}>{data[position].count}</span>
                    </div>
                );
            }
        }

        rows.push(
            <div key={i} className={styles["summary-bloc-row"] + (i != 0 ? " " + styles["hidden-row"] : "")}>
                {blocs}
            </div>
        );
    }


    return ( 
        <div className={styles["summary-bloc-container"] + (hover ? " " + styles["hidden-rows-visible"] : "")}>
            {rows}
        </div>
    );
}
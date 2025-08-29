export default class ElectionSummaryBlocs{
    static render({ innerHTML = "default" }){
        const container = document.createElement('div');
        container.classList.add('ElectionSummaryBlocs');

        container.innerHTML = innerHTML;

        return container;
    }
}
/*
export default function ElectionSummaryBlocs( 
    { data, rowLength = 99, hoverState } : 
    { 
        data : {party : Party, count : number, displayCount?: string}[], 
        rowLength? : number, 
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
            if(position >= data.length) break;

            if(shouldShowOther && i == 0 && j == 4){
                blocs.push(
                    <div key={-1}
                        className={styles["ElectionSummaryBlocs"] + " " + styles["other-bloc"]}
                        onMouseOver={() => {setHover(true)}}
                        onMouseOut={() => {setHover(false)}}
                    >
                        <span className={styles["ElectionSummaryBlocs-party"]}>Other</span>
                        <span className={styles["ElectionSummaryBlocs-count"]}>{totalOther}</span>
                    </div>
                );
            }
            else{
                blocs.push(
                    <div 
                        key={position} 
                        className={styles["ElectionSummaryBlocs"]}
                        style={{background: data[position].party.color || "var(--default-color)", color: data[position].party.textColor}}
                    >
                        <span className={styles["ElectionSummaryBlocs-party"]}>{data[position].party.displayId || data[position].party.id}</span>
                        <span className={styles["ElectionSummaryBlocs-count"]}>{data[position].displayCount || data[position].count}</span>
                    </div>
                );
            }
        }

        rows.push(
            <div key={i} 
                className={styles["ElectionSummaryBlocs-row"] 
                    + (i != 0 ? " " + styles["hidden-row"] : "") 
                    + (rowLength == 99 ? " " + styles["single-row"] : "")
                }>
                {blocs}
            </div>
        );
    }


    return ( 
        <div className={styles["ElectionSummaryBlocs"] + (hover ? " " + styles["hidden-rows-visible"] : "")}>
            {rows}
        </div>
    );
}*/
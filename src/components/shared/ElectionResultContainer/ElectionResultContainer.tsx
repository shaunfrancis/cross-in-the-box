import styles from './ElectionResultContainer.module.css';

export default function ElectionResultContainer( 
    { dimensions, map, children } : { dimensions: {w:string,h:string,minW:string,minH:string}, map: React.ReactNode, children: React.ReactNode }
){
    return (
        <div className={styles["election-container"]}>
            <div className={styles["election-messages-container"]}>
                election-messages-container
            </div>
            <div className={styles["election-results-container"]} style={{width:dimensions.w, height:dimensions.h, minWidth:dimensions.minW, minHeight:dimensions.minH}}>
                <div className={styles["election-heading-container"]}>
                    election-heading-container
                </div>
                <div className={styles["election-map-container"]}>
                    {map}
                </div>
            </div>
            {children}
        </div>
    )
}
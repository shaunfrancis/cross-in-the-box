import styles from './ElectionResultContainer.module.css';

export default function ElectionResultContainer( 
    { dimensions, map, title, summary, children } : { 
        dimensions: {w:string,h:string,minW:string,minH:string}, 
        map: React.ReactNode, 
        title : {title: string, subtitle: string[]}, 
        summary? : React.ReactNode,
        children: React.ReactNode 
    }
){
    return (
        <div className={styles["election-container"]}>
            <div className={styles["election-messages-container"]}>
                election-messages-container
            </div>
            <div className={styles["election-results-container"]} style={{width:dimensions.w, height:dimensions.h, minWidth:dimensions.minW, minHeight:dimensions.minH}}>
                <div className={styles["election-heading-container"]}>
                    <div className={styles["election-title"]}>
                        <img src="/messages.svg" className={styles["election-messages-button"]} />
                        <h2>
                            <div className={styles["election-title-text"]}>{title.title}</div>
                            <div className={styles["election-subtitle-text"]}>
                                {
                                    title.subtitle.map( line => {
                                        return ( <>
                                            <span>{line}</span><br/>
                                        </> )
                                    })
                                }
                            </div>
                        </h2>
                    </div>
                    {summary}
                </div>
                <div className={styles["election-map-container"]}>
                    {map}
                </div>
            </div>
            {children}
        </div>
    )
}
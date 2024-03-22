import { Fragment, useState } from 'react';
import styles from './ElectionResultContainer.module.css';

export default function ElectionResultContainer( 
    { dimensions, messages, map, title, summary, children } : { 
        dimensions: {w:string,h:string,minW:string,minH:string}, 
        messages?: boolean,
        map: React.ReactNode, 
        title : {title: string, subtitle: string[]}, 
        summary? : React.ReactNode,
        children: React.ReactNode 
    }
){
    let [messagesVisibility, setMessagesVisiblity] = useState<boolean>(false);

    return (
        <div className={styles["election-container"]}>
            { messages &&
                <div className={styles["election-messages-container"] + (messagesVisibility ? " " + styles["visible"] : "")}>
                    election-messages-container
                </div>
            }
            <div className={styles["election-results-container"]} style={{width:dimensions.w, height:dimensions.h, minWidth:dimensions.minW, minHeight:dimensions.minH}}>
                <div className={styles["election-heading-container"]}>
                    <div className={styles["election-title"]}>
                        { messages &&
                            <img src="/messages.svg" className={styles["election-messages-button"]} onClick={() => {setMessagesVisiblity(!messagesVisibility)}} />
                        }
                        <h2>
                            <div className={styles["election-title-text"]}>{title.title}</div>
                            <div className={styles["election-subtitle-text"]}>
                                {
                                    title.subtitle.map( (line, index) => {
                                        return ( 
                                            <Fragment key={index}>
                                                <span>{line}</span><br/>
                                            </Fragment>
                                        )
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
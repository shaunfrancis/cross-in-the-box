import { Fragment, useState } from 'react';
import styles from './ElectionResultContainer.module.css';

export default function ElectionResultContainer( 
    { dimensions, messages = [], map, title, summary, children } : { 
        dimensions: {w:string,h:string,minW:string,minH:string}, 
        messages?: React.ReactNode[],
        map: React.ReactNode, 
        title : string[]
        summary? : React.ReactNode,
        children: React.ReactNode 
    }
){
    while(title.length < 3) title.push("");
    let [messagesVisibility, setMessagesVisiblity] = useState<boolean>(false);

    return (
        <div className={styles["election-container"]} style={{height:dimensions.h, minHeight:dimensions.minH}}>
            { messages.length > 0 &&
                <div className={styles["election-messages-container"] + (messagesVisibility ? " " + styles["visible"] : "")}>
                    {messages}
                </div>
            }
            <div className={styles["election-results-container"]} style={{width:dimensions.w, minWidth:dimensions.minW}}>
                <div className={styles["election-heading-container"]}>
                    <div className={styles["election-title"]}>
                        { messages.length > 0 &&
                            <img src="/images/messages.svg" className={styles["election-messages-button"]} onClick={() => {setMessagesVisiblity(!messagesVisibility)}} />
                        }
                        <h2>
                            <div className={styles["election-title-text"]}>{title[0]}</div>
                            <div className={styles["election-subtitle-text"]}>
                                <span>{title[1]}</span><br/>
                                <span>{title[2]}</span>
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
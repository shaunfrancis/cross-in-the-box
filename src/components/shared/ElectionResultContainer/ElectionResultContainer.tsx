import { RefObject, forwardRef, useRef, useState } from 'react';
import styles from './ElectionResultContainer.module.css';

export default forwardRef(function ElectionResultContainer( 
    { dimensions, messages, messagesOpenOnLoad, map, title, summary, dedicatedPage, children } : { 
        dimensions: {w:string,h:string,minW:string,minH:string}, 
        messages?: React.ReactNode[],
        messagesOpenOnLoad?: boolean,
        map: React.ReactNode, 
        title : string[]
        summary? : React.ReactNode,
        dedicatedPage? : string,
        children : React.ReactNode 
    }, 
    ref : RefObject<HTMLDivElement>
){
    while(title.length < 3) title.push("");
    let [messagesVisibility, setMessagesVisiblity] = useState<boolean>(messagesOpenOnLoad || false);

    const messagesInnerContainer = useRef<HTMLDivElement>(null);
    let [scrollPosition, setScrollPosition] = useState<number>(0);


    const titleNodes = (<>
        <div className={styles["election-title-text"]}>{title[0]}</div>
        <div className={styles["election-subtitle-text"]}>
            <span>{title[1]}</span><br/>
            <span>{title[2]}</span>
        </div>
    </>);

    return (
        <div ref={ref} className={styles["election-container"]} style={{height:dimensions.h, minHeight:dimensions.minH}}>
            { (messagesOpenOnLoad || (messages && messages.length > 0) ) &&
                <div className={styles["election-messages-container"] + (messagesVisibility ? " " + styles["visible"] : "")}>

                    <div 
                        className={
                            styles["election-messages-scroll-button"] + " " + styles["top"]
                            + (scrollPosition == 0 ? " " + styles["hidden"] : "")
                        }
                        onClick={() => {
                            const container = messagesInnerContainer.current;
                            if(container){
                                const newScrollPosition = Math.max(0, scrollPosition - (container.clientHeight - 300));
                                container.scrollTo({top: newScrollPosition, behavior: "smooth"});
                                setScrollPosition(newScrollPosition);
                            }
                        }}
                    >up</div>

                    <div ref={messagesInnerContainer} className={styles["election-messages-inner-container"]}>
                        {messagesOpenOnLoad && (messages && messages.length == 0) && 
                            (
                                <p>put placeholder messages here</p>
                            )
                        }
                        {messages}
                    </div>

                    <div 
                        className={
                            styles["election-messages-scroll-button"] + " " + styles["bottom"]
                            + ((messagesInnerContainer.current && scrollPosition == messagesInnerContainer.current.scrollHeight - messagesInnerContainer.current.clientHeight) ? " " + styles["hidden"] : "")
                        }
                        onClick={() => {
                            const container = messagesInnerContainer.current;
                            if(container){
                                const newScrollPosition = Math.min(container.scrollHeight - container.clientHeight, scrollPosition + (container.clientHeight - 300));
                                container.scrollTo({top: newScrollPosition, behavior: "smooth"});
                                setScrollPosition(newScrollPosition);
                            }
                        }}
                    >down</div>
                </div>
            }
            <div className={styles["election-results-container"]} style={{width:dimensions.w, minWidth:"min( calc(100vw - 30px), " + dimensions.minW + ")"}}>
                <div className={styles["election-heading-container"]}>
                    <div className={styles["election-title"]}>
                        { messages &&
                            <img src="/images/messages.svg" className={styles["election-messages-button"]} onClick={() => {setMessagesVisiblity(!messagesVisibility)}} />
                        }
                        <h2>
                            { dedicatedPage ? 
                                (
                                    <a href={dedicatedPage} className="heading-link">
                                        {titleNodes}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                                    </a>
                                ) 
                                : titleNodes
                            }
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
});
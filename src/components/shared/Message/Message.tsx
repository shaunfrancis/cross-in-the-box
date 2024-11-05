import { Party } from 'src/Types';
import styles from './Message.module.css';

export default function Message( { 
        animate,
        noHeader,
        customHeaderChildren,
        date,
        square,
        oldSquare,
        children
    } : 
    { 
        animate? : boolean, 
        noHeader? : boolean, 
        customHeaderChildren?: React.ReactNode,
        date? : string | React.ReactNode, 
        square? : Party, 
        oldSquare? : Party, 
        children : React.ReactNode
    }
){
    return (
        <div className={styles["container"] + (animate ? " " + styles["animate-in"] : "")}>
            {!noHeader &&
                <div className={styles["header"]}>
                    {customHeaderChildren ? customHeaderChildren : (<>
                        <span>{date}</span>
                        <div className={styles["squares-container"]}>
                            { oldSquare && <>
                                <div className={styles["square"]} style={{background:oldSquare.color || "var(--default-color)"}}></div>
                                <img src="/images/arrow.svg" />
                            </> }
                            { square &&
                                <div className={styles["square"]} style={{background:square.color || "var(--default-color)"}}></div>
                            }
                        </div>
                    </>)}
                </div>
            }
            <div className={styles["body"]}>
                {children}
            </div>
        </div>
    )
}
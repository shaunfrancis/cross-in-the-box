import { Party } from 'src/Types';
import styles from './Message.module.css';

export default function Message( { noHeader, date, square, oldSquare, children } : { noHeader? : boolean, date? : string, square? : Party, oldSquare? : Party, children : React.ReactNode } ){
    return (
        <div className={styles["container"]}>
            {!noHeader &&
                <div className={styles["header"]}>
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
                </div>
            }
            <div className={styles["body"]}>
                {children}
            </div>
        </div>
    )
}
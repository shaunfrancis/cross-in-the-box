import styles from './Message.module.css';

export default function Message( { date, children } : { date? : string, children : React.ReactNode } ){
    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                {date}
            </div>
            <div className={styles["body"]}>
                {children}
            </div>
        </div>
    )
}
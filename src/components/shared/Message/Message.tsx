import styles from './Message.module.css';

export default function Message( { children } : { children : React.ReactNode } ){
    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                14:56
            </div>
            <div className={styles["body"]}>
                {children}
            </div>
        </div>
    )
}
import styles from './ElectionResultContainer.module.css';

export default function ElectionResultContainer( { children } : { children: React.ReactNode } ){
    return (
        <div className={styles["election-container"]}>
            <div className={styles["election-messages-container"]}>
                election-messages-container
            </div>
            <div className={styles["election-results-container"]}>
                <div className={styles["election-heading-container"]}>
                    election-heading-container
                </div>
                <div className={styles["election-map-container"]}>
                    election-map-container
                </div>
            </div>
            {children}
        </div>
    )
}
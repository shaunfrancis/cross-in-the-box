import styles from './RegionPage.module.css';

export default function RegionPage( { children } : { children : React.ReactNode } ){
    return (
        <div id={styles["container"]}>
            <aside>
                sidebar
            </aside>
            <main>
                {children}
            </main>
        </div>
    )
}
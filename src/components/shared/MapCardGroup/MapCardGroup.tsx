import styles from './MapCardGroup.module.css';

export default function MapCardGroup({children} : {children : React.ReactNode}){
    return (
        <section className={styles['group']}>
            {children}
        </section>
    )
}
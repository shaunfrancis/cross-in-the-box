import styles from './MapCard.module.css';

export default function MapCard({title, src, href} : {title : string, src : string, href : string}){
    return (
        <a href={href} className="unstyled">
            <section className={styles['card']}>
                <h2>{title}</h2>
                <img src={src} />
            </section>
        </a>
    )
}
import styles from './ElectionResultsSection.module.css';

export default function ElectionResultsSection( { children } : { children : React.ReactNode } ){
    return ( <div id={styles["container"]}>{children}</div> );
}
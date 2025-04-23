import styles from './CanadaRidingSidebar.module.css';
import CanadaRidingSearchSection from '../../CanadaRidingSearchSection/CanadaRidingSearchSection';

export default function CanadaRidingSidebar({ region } : { region : {id? : string, title : string} }){
    return (
        <div id={styles["container"]}>
        <section className="shaded purple">
            <h1>Find a Riding</h1>
            <CanadaRidingSearchSection />
        </section>
        {/* <UKConstituencyMap region={region} /> */}
        <section>
            <p style={{textAlign:"justify"}}>Election results are sourced from <a href="https://www.elections.ca" target="_blank">Elections Canada</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@tennessine.co.uk?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
        </div>
    )
}
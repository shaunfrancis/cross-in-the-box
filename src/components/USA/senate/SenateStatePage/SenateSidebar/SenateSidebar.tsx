import SenateSearchSection from '../../SenateSearchSection/SenateSearchSection';
import styles from './SenateSidebar.module.css';

export default function SenateSidebar({ region } : { region : {id? : string, title : string} }){
    return (
        <div id={styles["container"]}>
        <section className="shaded purple">
            <h1>Find a State</h1>
            <SenateSearchSection />
        </section>
        {/* <UKConstituencyMap region={region} /> */}
        <section>
            <p style={{textAlign:"justify"}}>Candidates and results for each of the 50 states and the District of Columbia are sourced from <a href="https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/" target="_blank" >the Federal Election Commission</a>. Results for Maine and Nebraska's congressional districts are sourced from their <a href="https://www.archives.gov/electoral-college/results" target="_blank">Certificates of Ascertainment of Electors</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@tennessine.co.uk?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
        </div>
    )
}
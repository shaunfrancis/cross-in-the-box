
import UKConstituencySearchSection from 'src/components/UK/UKConstituencySearchSection/UKConstituencySearchSection';
import UKConstituencyMap from '../UKConstituencyMap/UKConstituencyMap';
import UKConstituencyPortrait from '../UKConstituencyPortrait/UKConstituencyPortrait';
import styles from './CanadaRidingSidebar.module.css';

export default function CanadaRidingSidebar({ region } : { region : {id? : string, title : string} }){
    return (<h1>sidebar</h1>);
    return (
        <div id={styles["container"]}>
        <section className="shaded purple">
            <h1>Find a Constituency</h1>
            <UKConstituencySearchSection />
        </section>
        <UKConstituencyPortrait region={region} />
        <UKConstituencyMap region={region} />
        <section>
            <p style={{textAlign:"justify"}}>Results for the 2019 General Election and all by-elections are sourced directly from the returning officer. Results for the 2017, 2015, and 2010 General Elections are sourced from the <a href="https://data.gov.uk/dataset/b77fcedb-4792-4de4-935f-4f344ed4c2c6/general-election-results-2017" target="_blank">Greater London Authority</a>. Candidate names for the 2024 and 2019 General Elections are sourced directly from each constituency's relevant Statement of Persons Nominated. Candidate names prior to 2019 and results prior to 2010 are sourced from <a href="https://en.wikipedia.org/wiki/United_Kingdom_Parliament_constituencies">Wikipedia</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@tennessine.co.uk?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
        </div>
    )
}
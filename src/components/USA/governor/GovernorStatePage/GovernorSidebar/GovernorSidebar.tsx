import StateElectionLinks from 'src/components/USA/shared/StateElectionLinks/StateElectionLinks';
import GovernorSearchSection from '../../GovernorSearchSection/GovernorSearchSection';
import styles from './GovernorSidebar.module.css';

export default function GovernorSidebar({ region } : { region : {id? : string, title : string} }){
    return (
        <div id={styles["container"]}>
        <section className="shaded purple">
            <h1>Find a State</h1>
            <GovernorSearchSection />
        </section>
        {region.id && <StateElectionLinks region={{id: region.id!, title: region.title}} />}
        <section>
            <p style={{textAlign:"justify"}}>Candidates and results for each of the 50 states are sourced from their certified election results, usually found on the state's Secretary of State website.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@tennessine.co.uk?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
        </div>
    )
}
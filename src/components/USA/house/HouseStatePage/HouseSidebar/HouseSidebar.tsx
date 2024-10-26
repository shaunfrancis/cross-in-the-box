import StateElectionLinks from 'src/components/USA/shared/StateElectionLinks/StateElectionLinks';
import HouseSearchSection from '../../HouseSearchSection/HouseSearchSection';
import styles from './HouseSidebar.module.css';

export default function HouseSidebar({ region } : { region : {id? : string, title : string} }){
    return (
        <div id={styles["container"]}>
        <section className="shaded purple">
            <h1>Find a District</h1>
            <HouseSearchSection />
        </section>
        {region.id && <StateElectionLinks region={{id: region.id!, title: region.title}} />}
        <section>
            <p style={{textAlign:"justify"}}>Candidates and results for each of the 435 districts are sourced from <a href="https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/" target="_blank">the Federal Election Commission</a>. Ranked Choice Voting results for Maine are obtained from the state's <a href="https://www.maine.gov/sos/cec/elec/results/index.html" target="_blank">Bureau of Corporations, Elections &amp; Commissions</a>.</p>
            <p>Data missing or incorrect? <a href="mailto:hello@tennessine.co.uk?subject=Election%20data%20wrong%20or%20missing">Let us know.</a></p>
        </section>
        </div>
    )
}
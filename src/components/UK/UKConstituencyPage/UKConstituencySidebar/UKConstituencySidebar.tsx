import UKConstituencySearchSection from '../../UKConstituencySearchSection/UKConstituencySearchSection';
import styles from './UKConstituencySidebar.module.css';

export default function UKConstituencySidebar(){
    return (
        <div id={styles["container"]}>
            <section className="shaded">
                <h1>Find A Constituency</h1>
                <UKConstituencySearchSection />
            </section>
        </div>
    )
}
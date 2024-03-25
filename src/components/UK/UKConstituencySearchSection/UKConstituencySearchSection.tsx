'use client';

import { Endpoint } from 'src/Constants';
import styles from './UKConstituencySearchSection.module.css';

export default function UKConstituencySearchSection(){
    const search = async (query : string) => {
        const results : { regions : any[], candidates : any[]} = await fetch(Endpoint + "/search/uk/" + query).then( res => res.json() );
        console.log(results);
    }

    return (
        <div id={styles["container"]}>
            <input type="text" id={styles["search-bar"]} spellCheck={false} onChange={(event) => { search(event.target.value) }} />
        </div>
    )
}
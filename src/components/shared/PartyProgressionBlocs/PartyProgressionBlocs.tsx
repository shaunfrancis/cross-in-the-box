import { Party } from 'src/Types';
import styles from './PartyProgressionBlocs.module.css';
import { Fragment } from 'react';

export default function PartyProgressionBlocs( { parties } : { parties : Party[] } ){
    return (
        <div className={styles["progression-bloc-container"]}>
        {
            parties.map( (party, index) => {
                return ( 
                    <Fragment key={index}>
                        { index != 0 && <img src="/images/arrow.svg" />}
                        <div key={index} className={styles["bloc"]} style={{background:party.color, color:party.textColor}}>
                            {party.displayId}
                        </div>
                    </Fragment>
                )
            })
        }
        </div>
    )
}
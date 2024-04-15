'use client';
import { useEffect, useState } from 'react';
import styles from './UKConstituencyPortrait.module.css';
import { Endpoint } from 'src/Constants';

export default function UKConstituencyPortrait({ region } : { region : {id? : string, title : string}}){
    const [portrait, setPortrait] = useState<number>(-1);

    useEffect( () => {
        if(!("id" in region)) return;

        const getData = async () => {
            const portraitData : {hasPortrait : boolean, id?: number} = await fetch(Endpoint + '/special/uk/portrait/' + region.id).then( res => res.json() );
            if(portraitData.hasPortrait) setPortrait(portraitData.id!);
        };
        getData();

    }, [region]);

    return ( portrait != -1 && 
        <section>
            <h1>Official Portrait</h1>
            <img 
                src={`https://members-api.parliament.uk/api/Members/${portrait}/Portrait?cropType=ThreeTwo&webVersion=false`} 
                onError={() => { setPortrait(-1) }}
                id={styles["portrait-image"]}
                width="100%" 
            />
            <p>Portrait is released under an <a target="_blank" href="https://creativecommons.org/licenses/by/3.0/">Attribution 3.0 Unported (CC BY 3.0)</a> licence on the <a target="_blank" href={`https://members.parliament.uk/member/${portrait}/portrait`}>UK Parliament website</a>.</p>
        </section>
    )
}
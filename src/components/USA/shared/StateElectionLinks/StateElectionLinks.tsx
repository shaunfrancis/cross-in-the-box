import { useEffect, useState } from 'react';
import styles from './StateElectionLinks.module.css';
import { Region } from 'src/Types';
import { DefaultParty, Endpoint } from 'src/constants/shared';
import { constituencyToSlug } from 'src/lib/UK';

interface Link{
    type : string,
    title : string,
    label : string,
    region_id : string,
    color : string | null,
    textColor : string | null
}

export default function StateElectionLinks( { region } : { region : Region } ){

    const [links, setLinks] = useState<Link[]>([]);

    //get two-letter state abbreviation from ID
    const baseId = region.id.replace(/^(S|G)/g, "").replace(/[0-9]/g, "").substring(0, 2);

    useEffect( () => {
        (async () => {
            const stateLinks : Link[] = await fetch(Endpoint + '/special/usa/state-links/' + baseId).then( res => res.json() );
            setLinks(stateLinks);
        })();
    }, [region]);

    const button = (link : Link) => {
        let href = "/usa/";
        switch(link.type){
            case "presidential": href += "presidential-elections/state/"; break;
            case "senate": href += "senate-elections/state/"; break;
            case "house": href += "house-elections/district/"; break;
            case "governor": href += "gubernatorial-elections/state/"; break;
        }
        href += constituencyToSlug(link.title);

        return (
            <a 
                className={styles["link-button"]} 
                href={href}
                style={{
                    background: link.color || DefaultParty.color,
                    color: link.textColor ? link.textColor : "#fff"
                }}
            >
                { link.label || link.title }
            </a>
        )
    };


    return region.title != "District of Columbia" && (
        <section>
            <h2>President</h2>
            <div className={styles["link-buttongroup"]}>
                { links.filter(l => l.type == "presidential").map( link => button(link) ) }
            </div>

            <h2>Senate</h2>
            <div className={styles["link-buttongroup"]}>
                { links.filter(l => l.type == "senate").map( link => button(link) ) }
            </div>

            <h2>House</h2>
            <div className={styles["link-buttongroup"]}>
                { links.filter(l => l.type == "house").map( link => button(link) ) }
            </div>

            <h2>Governor</h2>
            <div className={styles["link-buttongroup"]}>
                { links.filter(l => l.type == "governor").map( link => button(link) ) }
            </div>
        </section>
    )
}
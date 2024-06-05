import { RefObject } from 'react';
import styles from './HeroNav.module.css';

export default function HeroNav( { items } : 
    { items : { title : string, src : string, ref : RefObject<HTMLElement>, fun? : () => any }[] }
){

    const navItems : React.ReactNode[] = [];
    items.forEach( (item, index) => {
        navItems.push(
            <li 
                key={index}
                onClick={ () => { 
                    if(item.ref.current) item.ref.current.scrollIntoView({behavior:"smooth"});
                    if(item.fun) item.fun();
                } }
            >
                <img src={item.src} />
                <span>{item.title}</span>
            </li>
        )
    });

    return (
        <nav id={styles["hero-nav"]}>
            <ul>{navItems}</ul>
        </nav>
    )
}
import { RefObject } from 'react';
import styles from './HeroNav.module.css';
import HeroNavItem from '../HeroNavItem/HeroNavItem';

export default function HeroNav( { items } : 
    { items : { title : string, src : string, ref? : RefObject<HTMLElement>, fun? : () => any }[] }
){

    const navItems : React.ReactNode[] = [];
    items.forEach( (item, index) => {
        navItems.push(
            <HeroNavItem key={index} item={item} />
        )
    });

    return (
        <nav id={styles["hero-nav"]}>
            <ul>{navItems}</ul>
        </nav>
    )
}
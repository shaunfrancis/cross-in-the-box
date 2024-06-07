import { RefObject } from 'react';
import styles from './HeroNavItem.module.css';

export default function HeroNavItem({ item } : 
    { item : { title : string, src : string, ref? : RefObject<HTMLElement>, fun? : () => any } }
){
    return (
        <li
        className={styles["hero-item"]}
        onClick={ () => { 
            if(item.ref?.current) item.ref.current.scrollIntoView({behavior:"smooth"});
            if(item.fun) item.fun();
        } }
    >
            <img src={item.src} />
            <span>{item.title}</span>
        </li>
    )
}
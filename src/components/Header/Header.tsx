import { Link } from "react-router-dom"

import styles from './Header.module.css';

export default function Header( { links = [] } : { links? : Array<any> } ){
    return (
        <header id={styles["header"]}>
            <nav>
                <ul>
                    {
                        links.map( (link : any, index: number) => {
                            return (
                                <li key={index}>
                                    <Link to={link.path}>{link.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}
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
                                    <a href={link.path}>{link.title}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}
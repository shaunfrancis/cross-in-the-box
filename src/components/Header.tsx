import { Link } from "react-router-dom"

export default function Header( { links = [] } : { links? : Array<any> } ){
    return (
        <header>
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
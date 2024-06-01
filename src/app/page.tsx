export default function Page(){
    return ( <main style={{padding:"30px"}}>
        <img src="images/logo.svg" width="200" alt="Cross In The Box" />
        <p>Welcome to Cross In The Box. This website contains interactive election results for various countries. It is currently under construction with the intention of completion later in 2024.</p>
        <p>You can access some of the pages that are currently under construction:</p>
        <ul>
            <li>
                United Kingdom
                <ul>
                    <li><a href="uk/general-elections">General Elections</a></li>
                    <li><a href="uk/scottish-parliament-elections">Scottish Parliament Elections</a></li>
                    <li><a href="uk/senedd-elections">Senedd Elections</a></li>
                </ul>
            </li>
            <li>More to follow</li>
        </ul>
        <p>This website is a development of the existing pages at <a href="https://politics.tennessine.co.uk">politics.tennessine.co.uk</a>.</p>
    </main> )
}
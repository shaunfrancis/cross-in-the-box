export default function Page(){
    return ( <main style={{padding:"30px"}}>
        <img src="images/logo.png" width="200" alt="Cross In The Box" />
        <p>Welcome to Cross In The Box! This website contains interactive election results for countries around the world. It is currently under construction, and more pages will be added in time.</p>
        <p>You can access the completed pages:</p>
        <ul>
            <li>
                Canada
                <ul>
                    <li><a href="canada/federal-elections">Federal Elections</a></li>
                </ul>
            </li>
            <li>
                United Kingdom
                <ul>
                    <li><a href="uk/general-elections">General Elections</a></li>
                </ul>
            </li>
            <li>
                United States
                <ul>
                    <li><a href="usa/2024-elections">2024 Elections</a></li>
                    <li><a href="usa/presidential-elections">Presidential Elections</a></li>
                    <li><a href="usa/senate-elections">Senate Elections</a></li>
                    <li><a href="usa/house-elections">House Elections</a></li>
                    <li><a href="usa/gubernatorial-elections">Gubernatorial Elections</a></li>
                </ul>
            </li>
            <li>
                Vatican City
                <ul>
                    <li><a href="vatican-city/papal-conclaves">Papal Conclaves</a></li>
                </ul>
            </li>
        </ul>
        <p>This website is a redevelopment of the existing pages at <a href="https://politics.tennessine.co.uk">politics.tennessine.co.uk</a>. You can access the pages yet to be added here on Tennessine:</p>
        <ul>
            <li>
                France
                <ul>
                    <li><a href="https://politics.tennessine.co.uk/france/presidential-elections/overview/citb/">Presidential Elections</a></li>
                </ul>
            </li>
            <li>
                Hungary
                <ul>
                    <li><a href="https://politics.tennessine.co.uk/hungary/parliamentary-elections/overview/citb/">Parliamentary Elections</a></li>
                </ul>
            </li>
            <li>
                United Kingdom
                <ul>
                    <li><a href="https://politics.tennessine.co.uk/uk/scottish-parliament-elections/overview/citb/">Scottish Parliament Elections</a></li>
                    <li><a href="https://politics.tennessine.co.uk/uk/senedd-cymru-elections/overview/citb/">Senedd Cymru Elections</a></li>
                </ul>
            </li>
        </ul>
    </main> )
}
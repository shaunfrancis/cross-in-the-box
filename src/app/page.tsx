export default function Page(){
    return ( <main style={{padding:"30px"}}>
        <img src="images/logo.svg" width="200" alt="Cross In The Box" />
        <p>Welcome to Cross In The Box. This website contains interactive election results for various countries. It is currently under construction and will be updated throughout 2024.</p>
        <p>You can access the completed pages:</p>
        <ul>
            <li>
                United Kingdom
                <ul>
                    <li><a href="uk/general-elections">General Elections</a></li>
                </ul>
            </li>
        </ul>
        <p>This website is a development of the existing pages at <a href="https://politics.tennessine.co.uk">politics.tennessine.co.uk</a>, where you can find other elections yet to be added here.</p>
    </main> )
}
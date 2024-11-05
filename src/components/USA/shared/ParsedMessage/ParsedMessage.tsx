import { useRouter } from "next/navigation";
import Message from "src/components/shared/Message/Message";
import PopupBarGraph from "src/components/shared/PopupBarGraph/PopupBarGraph";
import { DefaultParty } from "src/constants/shared";
import { dateToLongDate } from "src/lib/shared";
import { MessageData, Party } from "src/Types";

export default function ParsedMessage({parties, message, animate} : { parties : Party[], message : MessageData, animate? : boolean }){
    const router = useRouter();
    const addElectionLinks = (text : string) : React.ReactNode[] => {
        
        const spans : React.ReactNode[] = [];
        text.split("#").forEach( (link, index) => {
            if(link == "") return;
    
            if(index % 2){
                const [_, type, slug, displayText] = link.split("@");
    
                let url = "/usa/";
                switch(type){
                    case "president": url += "presidential-elections/state/"; break;
                    case "senate": url += "senate-elections/state/"; break;
                    case "house": url += "house-elections/district/"; break;
                    case "governor": url += "gubernatorial-elections/state/";
                }
                url += slug;
    
                spans.push(
                    <span 
                        key={index}
                        className="interactive"
                        onClick={ () => { router.push(url) } }
                    >
                        {displayText}
                    </span> 
                );
            }
            else spans.push( <span key={index}>{link}</span> );
        });
        return spans;
    }

    const est = new Date(message.date.toLocaleString("en-US", {timeZone: "America/New_York"}));
    let time = est.getHours().toString().padStart(2,'0') + ":" + est.getMinutes().toString().padStart(2,'0');

    let dateString : string;
    const dayWord = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][est.getDay()];

    if((new Date()).getFullYear() === est.getFullYear()){ //current year, don't show full date
        //for live messages, if event extends beyond Wednesday following election day then show day of week
        if(! [2,3].includes(est.getDay())){
            dateString = dayWord + ", " + time;
        }
        else dateString = time;
    }
    else dateString = dayWord + " " + dateToLongDate(est) + ", " + time;

    const date = ( <>
        {dateString} <span style={{fontSize:"0.8em"}}>ET</span>
    </> );


    const square = message.square ? (parties.find(p => p.id == message.square) || DefaultParty) : undefined;
    const oldSquare = message.old_square ? (parties.find(p => p.id == message.old_square) || DefaultParty) : undefined;

    let messageResults : React.ReactNode[] = [];
    if(message.results) switch(message.result_type){
        case 1: //exit poll                            
            messageResults.push( <PopupBarGraph key={"msg-result"} title={message.link_title} raw={true} goal={326/650} parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} /> );
            break;
        default:
            messageResults.push( <PopupBarGraph key={"msg-result"} title={message.link_title} parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} />);
    }

    return ( 
        <Message key={message.id} animate={animate} noHeader={message.no_header} date={date} square={square} oldSquare={oldSquare}>
            {addElectionLinks(message.text)}
            {messageResults}
        </Message>
    )
}
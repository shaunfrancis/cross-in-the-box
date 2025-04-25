import { useRouter } from "next/navigation";
import Message from "src/components/shared/Message/Message";
import PopupBarGraph from "src/components/shared/PopupBarGraph/PopupBarGraph";
import { DefaultParty } from "src/constants/shared";
import { MessageData, Party } from "src/Types";

export default function ParsedMessage(
    {
        parties,
        message,
        animate,
        urlFun,
        timeFun
    } : {
        parties : Party[],
        message : MessageData,
        animate? : boolean,
        urlFun : (slug : string, type? : string) => string,
        timeFun : (message : MessageData) => React.ReactNode
    }
){
    const router = useRouter();
    const addElectionLinks = (text : string) : React.ReactNode[] => {
        
        const spans : React.ReactNode[] = [];
        text.split("#").forEach( (link, index) => {
            if(link == "") return;
    
            if(index % 2){
                let [_, type, slug, displayText] = ["", "", link, link]; 
                if(link.includes("@")) [_ = "", type = "", slug = "", displayText = ""] = link.split("@");
    
                const url = urlFun(slug, type);
    
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

    const date = timeFun(message);


    const square = message.square ? (parties.find(p => p.id == message.square) || DefaultParty) : undefined;
    const oldSquare = message.old_square ? (parties.find(p => p.id == message.old_square) || DefaultParty) : undefined;

    let messageResults : React.ReactNode[] = [];
    if(message.results) switch(message.result_type){
        case 1: //exit poll                            
            messageResults.push( <PopupBarGraph key={"msg-result"} title={message.link_title} raw={true} goal={326/650} parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} /> );
            break;
        default:
            let hardcodeTitle : string | null = null;
            if(message.date.getFullYear() == 2024 && !message.link_title) hardcodeTitle = "Partial results";
            messageResults.push( <PopupBarGraph key={"msg-result"} title={hardcodeTitle ?? message.link_title} parties={parties} results={message.results.sort( (a,b) => b.votes - a.votes )} />);
    }

    return ( 
        <Message key={message.id} animate={animate} noHeader={message.no_header} date={date} square={square} oldSquare={oldSquare}>
            {addElectionLinks(message.text)}
            {messageResults}
        </Message>
    )
}
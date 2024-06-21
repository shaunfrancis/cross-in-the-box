import { DefaultParty } from 'src/Constants';
import styles from './PollTable.module.css';
import { Party, Poll } from 'src/Types';
import { getPollAverages, monthAbbrev } from 'src/lib/shared';

export default function PollTable(
    { polls, parties, maxPolls = Infinity, maxParties = Infinity, compact = false } : 
    { polls : Poll[], parties : Party[], maxPolls? : number, maxParties? : number, compact? : boolean }
){

    const averages = getPollAverages(polls).slice(0, maxParties);

    polls.sort((a,b) => {
        const endComparison = b.end.valueOf() - a.end.valueOf();
        return endComparison == 0 ? b.start.valueOf() - a.start.valueOf() : endComparison;
    });
    polls = polls.slice(0, maxPolls);

    return (
        <div className={styles["poll-table"] + (compact ? " " + styles["compact"] : "")}>
                <div className={styles["row"] + " " + styles["header"]}>
                    <div className={styles["pollster"]}>Pollster</div>
                    <div className={styles["fieldwork"]}>Fieldwork</div>
                    {!compact && <div className={styles["sample"]}>Sample</div>}
                    <div className={styles["figures"]}>
                        {
                            averages.map( (average, averageIndex) => {
                                const party = average.id == "other" ? 
                                    {...DefaultParty, displayId:"Other"} : 
                                    parties.find(p => p.id == average.id) || DefaultParty;

                                return (
                                    <div key={averageIndex} style={{background:party.color, color:party.textColor}}>
                                        {party.displayId || party.id}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
        {
            polls.map( (poll, pollIndex) => {

                const pollsterContent = <span>{poll.pollster || "Missing data"}</span>;

                let fieldwork = poll.start.getDate().toString();
                
                if(poll.start.getMonth() != poll.end.getMonth() || poll.start.valueOf() == poll.end.valueOf()) fieldwork += " " + monthAbbrev(poll.start.getMonth());
                if(poll.start.valueOf() != poll.end.valueOf()) fieldwork += " – " + poll.end.getDate().toString() + " " + monthAbbrev(poll.end.getMonth());
                if(poll.end.getFullYear() != (new Date()).getFullYear()) fieldwork += " " + poll.end.getFullYear();

                return ( 
                    <div key={pollIndex} className={styles["row"]}>
                    
                        <div className={styles["pollster"]}>
                            { poll.source ? <a href={poll.source} target="_blank">{pollsterContent}</a> : <>{pollsterContent}</> }
                            { poll.client && <span className={styles["client-span"]}>, {poll.client}</span> }
                        </div>
                        <div className={styles["fieldwork"]}>
                            {fieldwork}
                        </div>
                        {!compact &&
                            <div className={styles["sample"]}>
                                {poll.sample || "–"}
                            </div>
                        }
                        <div className={styles["figures"]}>
                            {
                                averages.map( (average, averageIndex) => {
                                    const figure = poll.figures.find( f => f.party == average.id );
                                    const party = parties.find(p => p.id == average.id) || DefaultParty;

                                    let isLargest = false;
                                    if(figure && poll.figures.filter(f => figure.figure < f.figure).length == 0) isLargest = true;
                                    
                                    return (
                                        <div 
                                            key={averageIndex} 
                                            style={isLargest ? {background:party.color, color:party.textColor || "#fff"} : {}}
                                        >
                                                {figure?.figure !== undefined ? figure?.figure : <span style={{color:"rgb(102,102,102)"}}>–</span>}
                                        </div>
                                    )
                                })
                            }
                        </div>    
                    </div> 
                )
            })
        }
        </div>
    )
}
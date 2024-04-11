import { DefaultParty } from 'src/Constants';
import styles from './PollTable.module.css';
import { Party, Poll, PollFigure } from 'src/Types';
import { getPollAverages, monthAbbrev } from 'src/lib/shared';
import { Fragment } from 'react';

export default function PollTable(
    { polls, parties, maxPolls = Infinity, maxParties = Infinity } : 
    { polls : Poll[], parties : Party[], maxPolls? : number, maxParties? : number }
){

    const averages = getPollAverages(polls).slice(0, maxParties);

    polls.sort((a,b) => b.start.valueOf() - a.start.valueOf());
    polls = polls.slice(0, maxPolls);

    return (
        <div className={styles["poll-table"]}>
            
                <div className={styles["pollster"] + " " + styles["header"]}>Pollster</div>
                <div className={styles["fieldwork"] + " " + styles["header"]}>Fieldwork</div>
                <div className={styles["figures"] + " " + styles["header"]}>
                    {
                        averages.map( (average, averageIndex) => {
                            const party = parties.find(p => p.id == average.id) || DefaultParty;
                            return (
                                <div key={averageIndex} style={{background:party.color, color:party.textColor}}>
                                    {party.displayId || party.id}
                                </div>
                            )
                        })
                    }
                </div>
                
        {
            polls.map( (poll, pollIndex) => {

                let fieldwork = poll.start.getDate().toString();
                if(poll.start.getMonth() != poll.end.getMonth()) fieldwork += " " + monthAbbrev(poll.start.getMonth());
                fieldwork += " – " + poll.end.getDate().toString() + " " + monthAbbrev(poll.end.getMonth());

                return ( <Fragment key={pollIndex}>
                    
                        <div className={styles["pollster"]}>
                            <span>{poll.pollster}</span>
                            { poll.client && <span className={styles["client-span"]}>, {poll.client}</span> }
                        </div>
                        <div className={styles["fieldwork"]}>
                            {fieldwork}
                        </div>
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
                                                {figure?.figure || "–"}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                </Fragment> )
            })
        }
        </div>
    )
}
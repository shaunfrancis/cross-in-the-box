'use client';
import { MutableRefObject, RefObject, useEffect, useState } from "react";
import ParsedMessage from "src/components/shared/ParsedMessage/ParsedMessage";
import { Endpoint } from "src/constants/shared";
import { AnonymousResult, MessageData, Party, Poll, Result, SearchResults } from "src/Types";

export class SearchHandler<Type>{
    url : string;
    suffix : string;
    previousQuery : string;

    constructor(url : string, suffix : string = ""){
        this.url = url;
        this.suffix = suffix;
        this.previousQuery = "";
    }

    async permission(query : string) : Promise<boolean>{
        query = query.trim();

        if(query == this.previousQuery) return false;
        this.previousQuery = query.trim();

        if(query.length <= 2) return false;

        await new Promise( r => setTimeout(r, 500) );

        if(query != this.previousQuery) return false;
        return true;
    }

    async search(query : string) : Promise<Type | null>{
        const permissionToProceed = await this.permission(query);
        if(!permissionToProceed) return null;

        const response : Type = await fetch(this.url + encodeURIComponent(query) + this.suffix).then( res => res.json() );
        if(query != this.previousQuery) return null;
        return response;
    }
}

export class RegionSearchHandler extends SearchHandler<SearchResults>{
    constructor(url : string, suffix : string = ""){
        super(url, suffix);
    }

    async search(query : string) : Promise<SearchResults | null>{
        const results : SearchResults | null = await super.search(query);
        if(results){
            const precedence = (result : string) : number => {
                const words = query.split(/ |-|—/g);
                words.sort( (a,b) => b.length - a.length );
                
                let regexPattern = "(";
                words.forEach( (word, index) => {
                    regexPattern += (index == 0 ? "" : "|") + word.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
                })
                regexPattern += ")";

                let intersections = 0;
                result
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, '')
                    .split( new RegExp(regexPattern, "gi") )
                    .forEach( (fragment, index) => {
                        if(index % 2) intersections += fragment.length;
                    }
                );
                
                return intersections;
            };
            results.regions.sort( (a, b) =>  precedence(b.title) - precedence(a.title) );
            results.candidates.sort( (a, b) =>  precedence(b.candidate) - precedence(a.candidate) );
        }
        return results;
    }
}

export const highlightRelevance = (query : string, title : string) : React.ReactNode[] => {
    const words = query.split(/ |-|—/g);
    words.sort( (a,b) => b.length - a.length );
    
    let regexPattern = "(";
    words.forEach( (word, index) => {
        regexPattern += (index == 0 ? "" : "|") + word.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    })
    regexPattern += ")";

    const spans : React.ReactNode[] = [];
    const accentInsensitiveTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    let index = 0;
    accentInsensitiveTitle.split( new RegExp(regexPattern, "gi") ).forEach( (fragment, key) => {
        if(fragment != ""){
            const accentedFragment = title.substring(index, index + fragment.length);
            index += fragment.length;
            spans.push(
                <span key={key} style={ key % 2 ? {} : {color: "#666"} }>{accentedFragment}</span>
            );
        }
    });
    
    return spans;
}

export const useOnScreen = (ref : RefObject<Element>) : boolean => {
    const [onScreen, setOnScreen] = useState<boolean>(false);

    useEffect( () => {
        if(ref.current){
            const observer = new IntersectionObserver( ([entry]) => {
                setOnScreen(entry.isIntersecting);
                if(entry.isIntersecting) observer.disconnect();
            });

            observer.observe(ref.current);

            return () => { if(observer) observer.disconnect() };
        }
    }, [ref]);

    return onScreen;
}

export const parseJSONWithDates = (text : string, keys : string | string[]) => {
    if(typeof keys === "string") keys = [keys];
    return JSON.parse(text, (key, value) => {
        if(keys.includes(key)) return new Date(value);
        return value;
    });
}

export const getPollAverages = (polls : Poll[], nDays : number = 30) => {
    if(polls.length == 0) return [];

    const dayValue = 1000 * 60 * 60 * 24;

    let currentDate = Math.min((new Date()).valueOf(), polls[polls.length - 1].centre + nDays*dayValue);
    const lastNDaysOfPolls = polls.filter( p => {
        return p.centre >= currentDate - nDays * dayValue && p.centre <= currentDate;
    });

    const averages : {id : string, average : number}[] = [];
    lastNDaysOfPolls.forEach( poll => {
        poll.figures.forEach( figure => {
            if(!averages.find(p => p.id == figure.party)) averages.push({id: figure.party, average: -1});
        })
    })

    averages.forEach( party => {
        const relevantPolls = lastNDaysOfPolls.filter(p => p.figures.find(f => f.party == party.id));
        
        let numerator = 0, denominator = 0;
        relevantPolls.forEach( poll => {
            const figure = poll.figures.find(f => f.party == party.id)!.figure;
            const weight = nDays - ((currentDate - poll.centre) / dayValue);

            numerator += weight * figure;
            denominator += weight;
        });
        
        if(denominator != 0) party.average = numerator / denominator;
    });

    return averages.sort( (a,b) => {
        const value = (x : {id : string, average : number}) => {
            return x.id == "other" ? -Infinity : x.average;
        }
        return value(b) - value(a);
     } );
}

export const dateToLongDate = ( date : Date ) : string => {
    let ordinalIndicator = "th";
    if(![11,12,13].includes(date.getDate())) switch(date.getDate() % 10){
        case 1: ordinalIndicator = "st"; break;
        case 2: ordinalIndicator = "nd"; break;
        case 3: ordinalIndicator = "rd";
    }

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"][date.getMonth()];

    return date.getDate().toString() + ordinalIndicator + " " + month + " " + date.getFullYear();

}

export const addThousandsSpacing = ( votes : number | string ) => {
    return votes.toString().split('').reverse().join('').replace(/([0-9]{3})/g, "$1 ").split('').reverse().join('');
}

export const monthAbbrev = (month : number) => {
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month] || "?";
}

export const getResultsBySubElection = (results : AnonymousResult[]) => {
    const subElections : {subid : number, results : AnonymousResult[]}[] = [];

    let subids = new Set( results.map( result => ("subid" in result && (result.subid as number || 0)) || 0 ).sort().reverse() );
    subids.forEach( subid => {
        subElections.push({
            subid: subid,
            results: results.filter( result => ("subid" in result && (result.subid == subid)) || (!subid && !("subid" in result)) )
        });
    });

    return subElections;
}

export const getResultsByCandidate = (results : AnonymousResult[]) => {
    const candidates : {name : string, party : string, total : number, results : AnonymousResult[]}[] = [];

    results.forEach( result => {
        const existingCandidate = candidates.find(candidate => candidate.name == result.candidate && candidate.party == result.party);
        if(existingCandidate){
            existingCandidate.total += result.votes;
            existingCandidate.results.push( result );
        }
        else{
            candidates.push({
                name: result.candidate || "",
                party: result.party,
                total: result.votes,
                results: [result]
            })
        }
    });

    candidates.forEach( candidate => {
        candidate.results.sort( (a,b) => ("subid" in a ? a.subid as number : 0) - ("subid" in b ? b.subid as number : 0) )
    });
    candidates.sort( (a,b) => b.total - a.total );

    return candidates;
}

export const getMessages = async (
    parties : Party[],
    latestMessageDate : MutableRefObject<Date>, 
    url : string,
    regionUrlFun : (slug : string, type? : string) => string,
    timeFun : (message : MessageData) => React.ReactNode,
    existingMessages : {
        id: number;
        date: Date;
        node: React.ReactNode;
    }[] = []
) => {

    const messagesData : MessageData[] = await fetch(Endpoint + url)
        .then( res => res.text() )
        .then( res => parseJSONWithDates(res, "date") );

    const newMessages : {id : number, date : Date, node : React.ReactNode, pinned? : number}[] = [...existingMessages];
    messagesData.forEach( message => {
        if(message.date > latestMessageDate.current) latestMessageDate.current = message.date;

        const messageToBeUpdated = newMessages.find(m => m.id == message.id);
        if(messageToBeUpdated) messageToBeUpdated.node = <ParsedMessage key={message.id} parties={parties} message={message} urlFun={regionUrlFun} timeFun={timeFun} />;
        else newMessages.push( {
            id: message.id,
            date: message.date,
            pinned: message.pinned,
            node: <ParsedMessage key={message.id} parties={parties} message={message} animate={existingMessages.length > 0} urlFun={regionUrlFun} timeFun={timeFun} />
        } );
    });

    newMessages.sort( (a,b) => {
        return (a.pinned != b.pinned) ? (a.pinned || Infinity) - (b.pinned || Infinity) : 
            (a.date.valueOf() != b.date.valueOf()) ? b.date.valueOf() - a.date.valueOf() : b.id - a.id;
    });

    return newMessages;

}

export const orderResults = (a : Result, b : Result) => {
    if(a.votes != b.votes) return b.votes - a.votes;
    else if(a.elected) return -Infinity;
    else if(b.elected) return Infinity;
    else{
        const aSurname = a.candidate.split(" ")[a.candidate.split(" ").length-1];
        const bSurname = b.candidate.split(" ")[b.candidate.split(" ").length-1];
        return aSurname.localeCompare(bSurname);
    }
}
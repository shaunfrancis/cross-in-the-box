'use client';
import { RefObject, useEffect, useState } from "react";
import { Poll } from "src/Types";

class SearchHandler{
    url : string;
    previousQuery : string;

    constructor(url : string){
        this.url = url;
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

    async search<Type>(query : string) : Promise<Type | null>{
        const permissionToProceed = await this.permission(query);
        if(!permissionToProceed) return null;

        const response : Type = await fetch(this.url + encodeURIComponent(query)).then( res => res.json() );
        if(query != this.previousQuery) return null;
        return response;
    }
}

const useOnScreen = (ref : RefObject<Element>) : boolean => {
    const [onScreen, setOnScreen] = useState<boolean>(false);

    useEffect( () => {
        if(ref.current){
            const observer = new IntersectionObserver( ([entry]) => {
                setOnScreen(entry.isIntersecting);
            });

            observer.observe(ref.current);

            return () => { if(observer) observer.disconnect() };
        }
    }, [ref]);

    return onScreen;
}

const parseJSONWithDates = (text : string, keys : string | string[]) => {
    if(typeof keys === "string") keys = [keys];
    return JSON.parse(text, (key, value) => {
        if(keys.includes(key)) return new Date(value);
        return value;
    });
}

const getPollAverages = (polls : Poll[], nDays : number = 30) => {
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

const addThousandsSpacing = ( votes : number | string ) => {
    return votes.toString().split('').reverse().join('').replace(/([0-9]{3})/g, "$1 ").split('').reverse().join('');
}

const monthAbbrev = (month : number) => {
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month] || "?";
}

export { SearchHandler, useOnScreen, parseJSONWithDates, getPollAverages, addThousandsSpacing, monthAbbrev }
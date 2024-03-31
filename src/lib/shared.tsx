'use client';
import { RefObject, useEffect, useState } from "react";

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

const addThousandsSpacing = ( votes : number | string ) => {
    return votes.toString().split('').reverse().join('').replace(/([0-9]{3})/g, "$1 ").split('').reverse().join('');
}

export { SearchHandler, useOnScreen, parseJSONWithDates, addThousandsSpacing }
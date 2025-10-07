const Endpoint = "/api";

class CachedDataSkeleton{

    static parties = [];
    static fetchParties(){ return new Promise( res => res([]) ); }
    static regions = [];
    static fetchRegions(){ return new Promise( res => res([]) ); }

    static _results = {};
    static get results(){
        return this._results;
    }

    static downloadProperty(key, path, applyTransform = (_) => _){
        return new Promise( async resolve => {
            // check if parties already exists
            if(this[key].length !== 0) return resolve(this[key]);

            // look in localStorage first
            // (implement later!!)

            // now download
            const promiseKey = key + "Promise";
            if(!this[promiseKey]){
                this[promiseKey] = fetch(path).then( async res => {
                    const data = await res.json();
                    delete this[promiseKey];
                    return data;
                });
            }

            const data = await this[promiseKey];
            applyTransform(data);
            this[key] = data;
            // (set in localStorage here)

            resolve(data);
        });
    }
};

const DefaultParty = window.DefaultParty = {
    id: "?",
    displayId: "?",
    title: "Missing data",
    color: "var(--default-color)"
}

class SearchHandler{
    constructor(url, suffix = ""){
        this.url = url;
        this.suffix = suffix;
        this.previousQuery = "";
    }

    async permission(query){
        query = query.trim();

        if(query == this.previousQuery) return false;
        this.previousQuery = query.trim();

        if(query.length <= 2) return false;

        await new Promise( sleep => setTimeout(sleep, 500) );

        if(query != this.previousQuery) return false;
        return true;
    }

    async search(query){
        const permissionToProceed = await this.permission(query);
        if(!permissionToProceed) return null;

        const response = await fetch(this.url + encodeURIComponent(query) + this.suffix).then( res => res.json() );
        if(query.trim() != this.previousQuery) return null;

        return response;
    }
}

const parseJSONWithDates = (text, keys) => {
    if(typeof keys === "string") keys = [keys];
    return JSON.parse(text, (key, value) => {
        if(keys.includes(key)) return new Date(value);
        return value;
    });
}

const dateToLongDate = (date, includeYear = date.getFullYear() !== (new Date()).getFullYear()) => {
    let ordinalIndicator = "th";
    if(![11,12,13].includes(date.getDate())) switch(date.getDate() % 10){
        case 1: ordinalIndicator = "st"; break;
        case 2: ordinalIndicator = "nd"; break;
        case 3: ordinalIndicator = "rd";
    }

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"][date.getMonth()];

    let longDate = date.getDate().toString() + ordinalIndicator + " " + month;
    if(includeYear) longDate += " " + date.getFullYear();
    return longDate;
}
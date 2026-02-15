const Endpoint = "/api";

class CachedDataSkeleton{
    static promises = {};
    static requestsCompleted = {};

    // fallback methods
    static fetchArray(){ return new Promise( res => res([]) ); }
    static fetchObject(key){
        return new Promise( res => {
            const obj = {};
            obj[key] = [];
            res(obj);
        } );
    }

    static parties = [];
    static fetchParties(){ return this.fetchArray(); }

    static regions = [];
    static fetchRegions(){ return this.fetchArray(); }

    static elections = {};
    static fetchElection(election, path){
        return this.downloadProperty(["elections", election], path, {
            applyParse: async (response) => {
                const text = await response.text();
                const json = parseJSONWithDates(text, 'date');
                return json;
            }
        });
    }

    static results = {};
    static fetchResults(_){ return this.fetchObject(_); }

    // updates proxies _updates to show empty array for any missing key
    // because updates may not always be required or downloaded but will always be assumed to exist
    static _updates = {};
    static updates = new Proxy(this._updates, {
        get(target, prop){
            if(!(prop in target)) return [];
            else return target[prop];
        }
    });
    static fetchUpdates(election, path){
        return this.downloadProperty(["_updates", election], path, {
            applyParse: async (response) => {
                const text = await response.text();
                const json = parseJSONWithDates(text, 'date');
                return json;
            },
            applyTransform: (data) => { data.sort( (a,b) => a.date.valueOf() - b.date.valueOf() ) }
        });
    }

    static messages = {};
    static fetchMessages(group, path){
        return this.downloadProperty(["messages", group], path, {
            applyParse: async (response) => {
                const text = await response.text();
                const json = parseJSONWithDates(text, 'date');
                return json;
            },
            applyTransform: (data) => {
                data.sort( (a,b) => {
                    return (a.pinned != b.pinned) ? (a.pinned || Infinity) - (b.pinned || Infinity) : 
                        (a.date.valueOf() != b.date.valueOf()) ? b.date.valueOf() - a.date.valueOf() : b.id - a.id;
                });
            }
        });
    }

    static downloadProperty(propertyArray, path, { applyParse, applyTransform = (_) => _ } = {} ){
        return new Promise( async resolve => {

            const propertyValue = propertyArray.reduce( (obj, key) => {
                if(!obj) return null;
                else return obj[key];
            }, this);
            
            // check if value already exists
            if(this.requestsCompleted[path] && propertyValue) return resolve(propertyValue);

            // look in localStorage first (indexedDB?)
            // (implement later!!)

            // now download
            let existingPromise = this.promises[path];
            if(!existingPromise){
                existingPromise = fetch(path).then( async res => {
                    let data;
                    if(applyParse) data = await applyParse(res);
                    else data = await res.json();
                    return data;
                });
                this.promises[path] = existingPromise;
            }

            const data = await existingPromise;
            applyTransform(data);

            let parent = this;
            for(let i = 0; i < propertyArray.length - 1; i++){
                if(!parent[propertyArray[i]]) parent[propertyArray[i]] = {};
                parent = parent[propertyArray[i]];
            }

            const value = parent[propertyArray[propertyArray.length - 1]];
            if(Array.isArray(value) && !this.requestsCompleted[path]){
                value.push(...data);
            }
            else parent[propertyArray[propertyArray.length - 1]] = data;

            // Mark as path request completed to prevent merging multiple copies in future
            this.requestsCompleted[path] = true;

            // (set in localStorage (indexedDB?) here)

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
        this.suffix = suffix.charAt(0) != "/" ? "/" + suffix : suffix;
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

/* Duplicated in lib/shared.php */
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

/* Duplicated in lib/shared.php */
const combineSubElections = (results) => { // {id: string, candidate: {name: string, position: int}, results: {votes: int, elected: bool} }[]
    results = structuredClone(results);
    let combinedResults = [];

    let resultsByRegion = {};
    results.forEach(result => {
        const key = result.id || 0;
        if(!(key in resultsByRegion)) resultsByRegion[key] = [];
        resultsByRegion[key].push(result);
    });

    Object.entries(resultsByRegion).forEach( ([regionId, regionResults]) => {
        let combinedRegionResults = [];
        regionResults.forEach(result => {
            const party = result.party;
            const candidate = result.candidates[0];

            const resultArray = {
                votes: result.votes,
                elected: candidate.elected
            };

            const existingResult = combinedRegionResults.find( combinedResult => {
                return combinedResult.party == party && combinedResult.candidates[0].name == candidate.name;
            } );

            if(existingResult){
                existingResult.results[result.subid] = resultArray;
            }
            else{
                delete result.candidates[0].elected;
                const newResultArray = {};
                newResultArray[result.subid || 0] = resultArray;
                combinedRegionResults.push({
                    id: regionId,
                    party: result.party,
                    candidates: result.candidates,
                    results: newResultArray
                });
                delete result.subid;
            }
        });

        combinedResults.push(...combinedRegionResults);
    } );

    return combinedResults;
}
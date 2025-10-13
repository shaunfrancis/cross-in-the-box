const Endpoint = "/api";

class CachedDataSkeleton{
    static promises = {};

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

    static results = {};
    static fetchResults(_){ return this.fetchObject(_); }

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
            if(propertyValue && propertyValue.length !== 0) return resolve(property);

            // look in localStorage first (indexedDB?)
            // (implement later!!)

            // now download
            const promiseKey = propertyArray.join("|");
            let existingPromise = this.promises[promiseKey];
            if(!existingPromise){
                existingPromise = fetch(path).then( async res => {
                    let data;
                    if(applyParse) data = await applyParse(res);
                    else data = await res.json();
                    this.promises[promiseKey]
                    return data;
                });
                this.promises[promiseKey] = existingPromise;
            }

            const data = await existingPromise;
            applyTransform(data);

            let parent = this;
            for(let i = 0; i < propertyArray.length - 1; i++){
                if(!parent[propertyArray[i]]) parent[propertyArray[i]] = {};
                parent = parent[propertyArray[i]];
            }
            parent[propertyArray[propertyArray.length - 1]] = data;

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
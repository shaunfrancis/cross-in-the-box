const Endpoint = "/api";

class CachedDataSkeleton{
    static country = null;
    static promises = {};
    static requestsCompleted = {};

    static liveIds = {
        attributes: false,
        messages: [],
        results: []
    }

    // fallback methods
    static fetchArray(){ return new Promise( res => res([]) ); }
    static fetchObject(key){
        return new Promise( res => {
            const obj = {};
            obj[key] = [];
            res(obj);
        } );
    }

    static attributes = [];
    static fetchAttributes(){
        let path = Endpoint + "/attributes/" + this.country;
        const isLive = this.liveIds.attributes;
        if(isLive) path += "?live=1";
        return this.downloadProperty(["attributes"], path, {}, isLive);
    }

    static parties = [];
    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/" + this.country, { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.displayId || party.id) );
            }
        });
    }

    static regions = [];
    static fetchRegions(type = null){
        let path = `${Endpoint}/regions/${this.country}`;
        if(type) path += "/" + type;
        return this.downloadProperty( ["regions"], path, {
            applyTransform: (data) => data.forEach( region => region.type = type )
        } );
    }

    static elections = {};
    static fetchElection(election){
        return this.downloadProperty(["elections", election], `${Endpoint}/elections/${this.country}/${election}`, {
            applyParse: async (response) => {
                const text = await response.text();
                const json = parseJSONWithDates(text, 'date');
                return json;
            }
        });
    }

    static results = {};
    static fetchResults(election){
        let path = `${Endpoint}/results/${this.country}/${election}`;
        const isLive = this.liveIds.results.includes(election);
        if(isLive) path += "?live=1";
        return this.downloadProperty(["results", election], path, {}, isLive);
    }

    // updates proxies _updates to show empty array for any missing key
    // because updates may not always be required or downloaded but will always be assumed to exist
    static _updates = {};
    static updates = new Proxy(this._updates, {
        get(target, prop){
            if(!(prop in target)) return [];
            else return target[prop];
        }
    });
    static fetchUpdates(election){
        return this.downloadProperty(["_updates", election], `${Endpoint}/updates/${this.country}/${election}`, {
            applyParse: async (response) => {
                const text = await response.text();
                const json = parseJSONWithDates(text, 'date');
                return json;
            },
            applyTransform: (data) => { data.sort( (a,b) => a.date.valueOf() - b.date.valueOf() ) }
        });
    }

    static messages = {};
    static fetchMessages(group, since = null){
        
        let path = `${Endpoint}/messages/${this.country}/${group}`;
        const isLive = this.liveIds.messages.includes(group);
        if(isLive) path += "?live=1";
        if(since) path += (isLive ? "&" : "?") + "since=" + since;

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
        }, isLive);
    }

    static downloadProperty(propertyArray, path, { applyParse, applyTransform = (_) => _ } = {}, isLive = false ){
        return new Promise( async resolve => {

            const propertyValue = propertyArray.reduce( (obj, key) => {
                if(!obj) return null;
                else return obj[key];
            }, this);
            
            // check if value already exists
            if(this.requestsCompleted[path] && propertyValue && !isLive) return resolve(propertyValue);

            // look in localStorage first (indexedDB?)
            // (implement later!!)

            // now download
            let existingPromise = !isLive ? this.promises[path] : null;
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
            if(!this.requestsCompleted[path]){
                if(Array.isArray(value)){
                    value.push(...data);
                }
                else parent[propertyArray[propertyArray.length - 1]] = data;
            }
            else if(isLive) parent[propertyArray[propertyArray.length - 1]] = data;

            // Mark as path request completed to prevent merging multiple copies in future
            this.requestsCompleted[path] = true;

            // (set in localStorage (indexedDB?) here)

            resolve(data);
        });
    }
};

const openWindow = (event, path) => {
    if(event.metaKey || event.ctrlKey) window.open(path, '_blank');
    else window.location.href = path;
}

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
// Split a set of results into an array of [subid, results]
const getResultsBySubElection = (results) => { // {subid : number, results : Result[]}[]
    const subElections = [];

    const subids = [];
    results.forEach( result => {
        if(!((subids.includes( (result.subid || 0).toString() ) ))){
            subids.push( (result.subid || 0).toString() );
        }
    });
    subids.sort();

    subids.forEach( subid => {
        subElections.push({
            subid: subid,
            results: results.filter( result => (result.subid || 0) == (subid || 0))
        });
    });

    return subElections;
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

/* Duplicated in lib/shared.php */
// Combine all results for the same candidate name into one array for each party vote total
const combineFusionResults = (results) => { // {id: string, candidates: {name: string, position: int}[], results: {party: string, votes: int, elected: bool} }[]
    results = structuredClone(results);
    results.sort( (a,b) => b.votes - a.votes );
    let combinedResults = [];

    let resultsByRegion = [];
    results.forEach( result => {
        const key = result.id || 0;
        if(!(key in resultsByRegion)) resultsByRegion[key] = [];
        resultsByRegion[key].push(result);
    });

    Object.entries(resultsByRegion).forEach( ([regionId, regionResults]) => {
        let combinedRegionResults = [];
        regionResults.forEach( result => {
            const candidate = result.candidates[0];

            const resultArray = {
                party: result.party,
                votes: result.votes,
                elected: candidate.elected
            };

            const existingResult = combinedRegionResults.find(combinedResult => combinedResult.candidates[0].name == candidate.name);

            if(existingResult){
                existingResult.results.push(resultArray);
                existingResult.votes += resultArray.votes;
            }
            else{
                delete result.candidates[0].elected;
                combinedRegionResults.push({
                    id: regionId,
                    candidates: result.candidates,
                    results: [resultArray],
                    votes: result.votes
                });
                delete result.subid;
            }
        });

        combinedResults.push(...combinedRegionResults);
    });

    return combinedResults;
}
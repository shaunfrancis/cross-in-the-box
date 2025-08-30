const Endpoint = "/api";

class CachedData{

    constructor(){}

    static _results = {};
    static get results(){
        return this._results;
    }
    
    static parties = [];
    static regions = [];
};

const parseJSONWithDates = (text, keys) => {
    if(typeof keys === "string") keys = [keys];
    return JSON.parse(text, (key, value) => {
        if(keys.includes(key)) return new Date(value);
        return value;
    });
}
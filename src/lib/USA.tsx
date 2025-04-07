import { Endpoint } from "src/constants/shared";
import { dateToLongDate, parseJSONWithDates } from "./shared";
import { MessageData, Result } from "src/Types";

export const partyIdToDisplayId = (partyId : string) => {
    let displayId = partyId.toUpperCase();

    if(["speaker","vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

export const stateToSlug = (constituency : string) => {
    return constituency.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "");
};

export const slugToLookupSlug = (slug : string) => { return slug };

export const regionUrlFun = (slug : string, type? : string) => {
    let url = "/usa/";
    switch(type){
        case "president": url += "presidential-elections/state/"; break;
        case "senate": url += "senate-elections/state/"; break;
        case "house": url += "house-elections/district/"; break;
        case "governor": url += "gubernatorial-elections/state/";
    }
    url += slug;
    return url;
}

export const timeFun = (message : MessageData) => {
    const est = new Date(message.date.toLocaleString("en-US", {timeZone: "America/New_York"}));
    let time = est.getHours().toString().padStart(2,'0') + ":" + est.getMinutes().toString().padStart(2,'0');

    let dateString : string;
    const dayWord = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][est.getDay()];

    /*if((new Date()).getFullYear() === est.getFullYear()){ //current year, don't show full date
        //for live messages, if event extends beyond Wednesday following election day then show day of week
        // console.log([5,6].includes(est.getDate()));
        if([2,3].includes(est.getDay()) && [5,6].includes(est.getDate())){
            dateString = time;
        }
        else dateString = dayWord + ", " + time;
    }
    else */dateString = dayWord + " " + dateToLongDate(est) + ", " + time;

    return ( <>
        {dateString} <span style={{fontSize:"0.8em"}}>ET</span>
    </> );
}
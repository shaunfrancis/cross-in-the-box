import { MessageData } from "src/Types";
import { dateToLongDate } from "./shared";

export const constituencyToSlug = (constituency : string) => {
    return constituency.toLowerCase()
        .replace(/ |—/g, "-")
        .replace(/,|'|\)|\(/g, "")
        .replace(/œ/g, "oe")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
};

export const slugToLookupSlug = (slug : string) => {
    if(slug == "ville-marie-le-sud-ouest-ile-des-soeurs") return "ville-marie-le-sud-ouest-ile-des-sœurs";
    return slug;
};

export const partyIdToDisplayId = (partyId : string) => {
    let displayId = partyId.toUpperCase();
    if(["vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    return displayId;
}

export const regionUrlFun = (slug : string, type? : string) => {
    let url = "/canada/";
    switch(type){
        case "federal": url += "federal-elections/"; break;
        default: url += "federal-elections/"
    }
    url += 'riding/' + constituencyToSlug(slug);
    return url;
}

export const timeFun = (message : MessageData) => {
    const est = new Date(message.date.toLocaleString("en-CA", {timeZone: "Canada/Eastern"}));
    let time = est.getHours().toString().padStart(2,'0') + ":" + est.getMinutes().toString().padStart(2,'0');

    let dateString : string;
    const dayWord = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][est.getDay()];

    dateString = dayWord + " " + dateToLongDate(est) + ", " + time;

    return ( <>
        {dateString} <span style={{fontSize:"0.8em"}}>ET</span>
    </> );
}
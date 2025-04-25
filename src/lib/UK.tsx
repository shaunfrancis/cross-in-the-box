import { Endpoint } from "src/constants/shared";
import { MessageData, Poll, PollFigure, PollSkeleton } from "src/Types";
import { dateToLongDate, parseJSONWithDates } from "./shared";

const parsePollData = async () => {
    const data : {polls: PollSkeleton[], figures: PollFigure[]} = await fetch(Endpoint + "/polls/uk")
        .then( res => res.text() )
        .then( res => parseJSONWithDates(res, ["start","end"]));

    const downloadedPolls : Poll[] = [];

    data.polls.forEach( skeleton => {
        const figures : PollFigure[] = data.figures.filter( f => f.poll_id == skeleton.id );

        const centre = (skeleton.end.valueOf() - skeleton.start.valueOf()) / 2 + skeleton.start.valueOf();

        downloadedPolls.push({...skeleton, centre: centre, figures: figures});
    });
    
    downloadedPolls.sort((a,b) => b.start.valueOf() - a.start.valueOf());

    return downloadedPolls;
};

const partyIdToDisplayId = (partyId : string) => {
    let displayId = partyId.toUpperCase();

    if(["speaker","vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

const constituencyToSlug = (constituency : string) => {
    return constituency.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o");
};

const slugToLookupSlug = (slug : string) => {
    if(slug == "ynys-mon") return "ynys-môn";
    return slug;
};

export const regionUrlFun = (slug : string, type? : string) => {
    let url = "/uk/";
    switch(type){
        case "general": url += "general-elections/"; break;
        default: url += "general-elections/"
    }
    url += 'constituency/' + constituencyToSlug(slug);
    return url;
}

export const timeFun = (message : MessageData) => {
    // const est = new Date(message.date.toLocaleString("en-GB", {timeZone: "Europe/London"}));
    let time = message.date.getHours().toString().padStart(2,'0') + ":" + message.date.getMinutes().toString().padStart(2,'0');

    let dateString : string;
    const dayWord = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][message.date.getDay()];

    /*if((new Date()).getFullYear() === est.getFullYear()){ //current year, don't show full date
        //for live messages, if event extends beyond Wednesday following election day then show day of week
        // console.log([5,6].includes(est.getDate()));
        if([2,3].includes(est.getDay()) && [5,6].includes(est.getDate())){
            dateString = time;
        }
        else dateString = dayWord + ", " + time;
    }
    else */dateString = dayWord + " " + dateToLongDate(message.date) + ", " + time;

    return ( <>
        {dateString}
    </> );
}

export { parsePollData, partyIdToDisplayId, constituencyToSlug, slugToLookupSlug }
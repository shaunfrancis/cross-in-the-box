import { Endpoint } from "src/Constants";
import { MessageData, Poll, PollFigure, PollSkeleton } from "src/Types";
import { parseJSONWithDates } from "./shared";

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

export { parsePollData, partyIdToDisplayId, constituencyToSlug, slugToLookupSlug }
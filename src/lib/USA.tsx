import { Endpoint } from "src/constants/shared";
import { parseJSONWithDates } from "./shared";
import { Result } from "src/Types";

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
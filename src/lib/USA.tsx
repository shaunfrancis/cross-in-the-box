const partyIdToDisplayId = (partyId : string) => {
    let displayId = partyId.toUpperCase();

    if(["speaker","vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

const stateToSlug = (constituency : string) => {
    return constituency.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "");
};

const slugToLookupSlug = (slug : string) => { return slug };

export { partyIdToDisplayId, stateToSlug, slugToLookupSlug }
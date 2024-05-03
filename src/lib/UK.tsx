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

export { partyIdToDisplayId, constituencyToSlug, slugToLookupSlug }
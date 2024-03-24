const partyIdToDisplayId = (partyId : string) => {
    return ["speaker","vacant"].includes(partyId) ? partyId.charAt(0).toUpperCase() + partyId.slice(1) : partyId.toUpperCase();
}

const constituencyToSlug = (constituency : string) => {
    return constituency.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o");
};

const slugToLookupSlug = (slug : string) => {
    if(slug == "ynys-mon") return "ynys-môn";
    return slug;
};

export { partyIdToDisplayId, constituencyToSlug, slugToLookupSlug }
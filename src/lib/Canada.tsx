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
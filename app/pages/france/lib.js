class CachedData extends CachedDataSkeleton{
    static country = "france";
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["VACANT"].includes(displayId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/france.php */
const regionToSlug = (title) => {
    return title.toLowerCase()
        .replace(/ |—/g, "-")
        .replace(/,|'|\)|\(/g, "")
        .replace(/œ/g, "oe")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
};
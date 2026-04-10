class CachedData extends CachedDataSkeleton{
    static country = "hungary";
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["VACANT"].includes(displayId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    displayId = displayId.replace(/-/g, '–');

    return displayId;
}

/* Duplicated in lib/hungary.php */
const regionToSlug = (title) => {
    return title.toLowerCase()
        .replace(/ |—/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
};
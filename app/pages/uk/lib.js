class CachedData extends CachedDataSkeleton{
    static country = "uk";
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["SPEAKER","VACANT"].includes(displayId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/uk.php */
const regionToSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o").replace(/ŵ/g, "w");
};
class CachedData extends CachedDataSkeleton{
    static country = "usa";
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();
    if(["VACANT"].includes(displayId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);
    return displayId;
}

/* Duplicated in lib/usa.php */
const regionToSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "");
};

/* Duplicated in lib/usa.php */
const getBaseId = (id) => {
    // get two-letter state abbreviation from any US region ID
    return id.replace(/^(S|G|[0-9])/g, '').replace(/[0-9]/g, '').substr(0, 2);
}
class CachedData extends CachedDataSkeleton{
    static fetchParties(){
        return this.downloadProperty("parties", Endpoint + "/parties/uk", (data) => {
            data.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
        });
    }

    static fetchRegions(){
        return this.downloadProperty("regions", Endpoint + "/regions/uk");
    }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["speaker","vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/uk.php */
const constituencyToSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o");
};
class CachedData extends CachedDataSkeleton{
    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/france", { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            }
        });
    }

    static fetchRegions(){ return this.downloadProperty(["regions"], Endpoint + "/regions/france") }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/france/" + election) }

    static fetchMessages(group, path = Endpoint + "/messages/france/" + group){ return super.fetchMessages(group, path) }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
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
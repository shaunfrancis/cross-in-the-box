class CachedData extends CachedDataSkeleton{
    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/hungary", { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            }
        });
    }

    static fetchRegions(){ return this.downloadProperty(["regions"], Endpoint + "/regions/hungary") }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/hungary/" + election) }

    static fetchMessages(group, path = Endpoint + "/messages/hungary/" + group){ return super.fetchMessages(group, path) }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/hungary.php */
const regionToSlug = (title) => {
    return title.toLowerCase()
        .replace(/ |—/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
};
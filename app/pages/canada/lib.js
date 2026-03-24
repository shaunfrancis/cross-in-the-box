class CachedData extends CachedDataSkeleton{
    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/canada", { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.displayId || party.id) );
            }
        });
    }

    static fetchRegions(){ return this.downloadProperty(["regions"], Endpoint + "/regions/canada") }

    static fetchElection(election, path = Endpoint + "/elections/canada/" + election){ return super.fetchElection(election, path) }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/canada/" + election) }

    static fetchUpdates(election, path = Endpoint + "/updates/canada/" + election){ return super.fetchUpdates(election, path) }

    static fetchMessages(group, path = Endpoint + "/messages/canada/" + group){ return super.fetchMessages(group, path) }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/canada.php */
const regionToSlug = (title) => {
    return title.toLowerCase()
        .replace(/ |—/g, "-")
        .replace(/,|\.|'|\)|\(/g, "")
        .replace(/œ/g, "oe")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
};
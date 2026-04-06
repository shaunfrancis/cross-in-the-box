class CachedData extends CachedDataSkeleton{
    static fetchAttributes(){ return this.downloadProperty(["attributes"], Endpoint + "/attributes/hungary") }

    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/hungary", { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.displayId || party.id) );
            }
        });
    }

    static fetchRegions(){ return this.downloadProperty(["regions"], Endpoint + "/regions/hungary") }

    static fetchElection(election, path = Endpoint + "/elections/hungary/" + election){ return super.fetchElection(election, path) }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/hungary/" + election) }

    static fetchUpdates(election, path = Endpoint + "/updates/hungary/" + election){ return super.fetchUpdates(election, path) }

    static fetchMessages(group, path = Endpoint + "/messages/hungary/" + group){ return super.fetchMessages(group, path) }
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
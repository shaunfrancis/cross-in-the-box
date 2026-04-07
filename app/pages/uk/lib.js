class CachedData extends CachedDataSkeleton{
    static fetchAttributes(){ return this.downloadProperty(["attributes"], Endpoint + "/attributes/uk") }

    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/uk", { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.displayId || party.id) );
            }
        });
    }

    static fetchRegions(type = null){
        return this.downloadProperty( ["regions"], Endpoint + "/regions/uk/" + (type || ""), {
            applyTransform: (data) => data.forEach( region => region.type = type )
        } );
    }

    static fetchElection(election, path = Endpoint + "/elections/uk/" + election){ return super.fetchElection(election, path) }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/uk/" + election) }

    static fetchUpdates(election, path = Endpoint + "/updates/uk/" + election){ return super.fetchUpdates(election, path) }

    static fetchMessages(group, path = Endpoint + "/messages/uk/" + group){ return super.fetchMessages(group, path) }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["SPEAKER","VACANT"].includes(displayId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/uk.php */
const regionToSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o");
};
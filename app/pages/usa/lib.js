class CachedData extends CachedDataSkeleton{
    static fetchParties(){
        return this.downloadProperty(["parties"], Endpoint + "/parties/usa", { 
            applyTransform: (data) => {
                data.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            }
        });
    }

    static fetchRegions(type = null){
        return this.downloadProperty( ["regions"], Endpoint + "/regions/usa/" + (type || ""), {
            applyTransform: (data) => data.forEach( region => region.type = type )
        } );
    }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/usa/" + election) }

    static fetchMessages(group, path = Endpoint + "/messages/usa/" + group){ return super.fetchMessages(group, path) }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();
    if(displayId.startsWith("IND_")) displayId = displayId.substring(4);
    return displayId;
}

/* Duplicated in lib/usa.php */
const regionToSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "");
};
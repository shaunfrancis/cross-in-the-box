class CachedData extends CachedDataSkeleton{
    static fetchAttributes(){ return this.downloadProperty(["attributes"], Endpoint + "/attributes/vatican") }

    static fetchParties(){ return this.downloadProperty(["parties"], Endpoint + "/parties/vatican") }

    static fetchRegions(type = null){
        return this.downloadProperty( ["regions"], Endpoint + "/regions/vatican/" + (type || ""), {
            applyTransform: (data) => data.forEach( region => region.type = type )
        } );
    }

    static fetchElection(election, path = Endpoint + "/elections/vatican/" + election){ return super.fetchElection(election, path) }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/vatican/" + election) }

    static fetchUpdates(election, path = Endpoint + "/updates/vatican/" + election){ return super.fetchUpdates(election, path) }

    static fetchMessages(group, path = Endpoint + "/messages/vatican/" + group){ return super.fetchMessages(group, path) }
}
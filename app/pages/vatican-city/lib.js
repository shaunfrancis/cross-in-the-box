class CachedData extends CachedDataSkeleton{
    static fetchParties(){ return this.downloadProperty(["parties"], Endpoint + "/parties/vatican") }

    static fetchRegions(type = null){
        return this.downloadProperty( ["regions"], Endpoint + "/regions/vatican/" + (type || ""), {
            applyTransform: (data) => data.forEach( region => region.type = type )
        } );
    }

    static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/vatican/" + election) }

    static fetchMessages(group, path = Endpoint + "/messages/vatican/" + group){ return super.fetchMessages(group, path) }
}
class CachedData extends CachedDataSkeleton{
    static country = "nz";

    static fetchResults(election){
        let path = `${Endpoint}/results/${this.country}/${election}`;
        const isLive = this.liveIds.results.includes(election);
        if(isLive) path += "?live=1";
        return this.downloadProperty(["results", election], path, {
            // populate nationwide list votes from each electorate's list votes
            applyTransform: data => {
                const totalListVotes = {};
                data.filter( result => result.subid === "L" && result.id !== "LIST" ).forEach( result => {
                    if(!(result.party in totalListVotes)) totalListVotes[result.party] = result.votes;
                    else totalListVotes[result.party] += result.votes;
                });
                data.filter( result => result.id === "LIST" ).forEach( result => {
                    if(result.party in totalListVotes) result.votes = totalListVotes[result.party];
                });
            }
        }, isLive);
    }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();

    if(["VACANT"].includes(displayId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);

    return displayId;
}

/* Duplicated in lib/new-zealand.php */
const regionToSlug = (title) => {
    return title.toLowerCase()
        .replace(/ |—/g, "-")
        .replace(/,|\.|'|\)|\(/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
};
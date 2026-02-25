import ElectionSummaryBar from 'components/shared/ElectionSummaryBar/ElectionSummaryBar';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class USAGubernatorialElectionResultContainer extends USAElectionResultContainer{
    constructor(elt){
        super(elt, USAGubernatorial);
    }

    async downloadData({ election, regionsType = null }, { messageGroup, showChanges }){
    
        if(
            CachedData.regions.length === 0 || 
            (regionsType != null && CachedData.regions.filter( region => region.type == regionsType ).length == 0)
        ) await CachedData.fetchRegions(regionsType);

        if(CachedData.parties.length === 0) await CachedData.fetchParties();

        for(let i = 0; i <= 3; i++){
            const govElectionId = "G" + (parseInt(election.substring(1)) - i);
            if(!CachedData.elections[govElectionId]) await CachedData.fetchElection(govElectionId);
            if(!CachedData.results[govElectionId]) await CachedData.fetchResults(govElectionId);
            if(!CachedData._updates[govElectionId]) await CachedData.fetchUpdates(govElectionId);
        }

        if(messageGroup && !CachedData.messages[messageGroup]) await CachedData.fetchMessages(messageGroup);
    }

    updateMap(_){
        let newFills = []; // {id: string, color: string, opacity?: number}[]

        for(let electionIndex = 3; electionIndex >= 0; electionIndex--){
            if(this.visibleMap.type === "geographic" && electionIndex !== 0) continue;

            const govElectionId = "G" + (parseInt(this.data.election.substring(1)) - electionIndex);

            const regionCounts = {};
            const winners = this.winFormula(CachedData.results[govElectionId]);
            winners.forEach( result => {
                if(!regionCounts[result.id]) regionCounts[result.id] = {total: result.candidates?.length ?? 1};
                else regionCounts[result.id].total += result.candidates?.length ?? 1;
            });
            winners.forEach( result => {
                for(let i = 0; i < (result.candidates?.length ?? 1); i++){
                    regionCounts[result.id].current = (regionCounts[result.id].current || 0) + 1;
                    const selector = regionCounts[result.id].total === 1 ? null : regionCounts[result.id].current;

                    const fill = (id, color) => {
                        return {
                            id: id,
                            selector: this.regionSelector(id, selector),
                            color: color || "var(--default-color)",
                            opacity: electionIndex !== 0 ? 0.33 : undefined
                        }
                    };

                    const regionUpdates = CachedData.updates[govElectionId].filter( update => {
                        return update.id == result.id && update.date <= CachedData.elections[this.data.election].date;
                    });
                    if(regionUpdates.length > 0){
                        const latestUpdate = regionUpdates[regionUpdates.length - 1];
                        const party = CachedData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                        if(party){
                            newFills = newFills.filter(f => f.id != latestUpdate.id);
                            newFills.push(fill(latestUpdate.id, party.color));
                        }
                    }
                    else{
                        const party = CachedData.parties.find( p => p.id == result.party ) || DefaultParty;
                        if(party){
                            newFills = newFills.filter(f => f.id != result.id);
                            newFills.push(fill(result.id, party.color));
                        }
                    }
                };
            });
        }
        this.fillMap({ regions: CachedData.regions, fills: newFills });
    }

    addSummary(){
        const summaries = []; // {candidate: string, party : Party, count : number}[]
        
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            const regionUpdates = CachedData.updates[this.data.election].filter( update => update.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === winner) || DefaultParty;
                summaries.push({ candidate: result.candidates[0].name, party: party, count: result.candidates[0].elected });
            }
            else summaries.find( summary => summary.party.id == winner ).count += result.candidates[0].elected;
        });


        summaries.sort( (a,b) => {
            return b.count - a.count || a.party.id.localeCompare(b.party.id);
        } );
        
        this.structure.summary.container.appendChild( 
            ElectionSummaryBar.render({ data: summaries, total: 50 })
        );
    }

    fillMap(data){

        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/usa/gubernatorial-elections/state/' + regionToSlug(region.title);
        }

        super.fillMap(data);
    }

    addMessages(){
        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                default:
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        title: message.link_title
                    }) );
            }
            return messageResults;
        }

        super.addMessages({ childrenFun: childrenFun });
    }
}
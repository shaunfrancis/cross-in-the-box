import ElectionSummaryBar from 'components/shared/ElectionSummaryBar/ElectionSummaryBar';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class USAHouseElectionResultContainer extends USAElectionResultContainer{
    constructor(elt){
        super(elt, USAHouse);
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            additionalContent: (id, regionResults, latestResultsUpdate, election) => {
                if(id === "2016NC09" && election === "H2018") return "This election was annulled due to fraud.";
                return super.mapHoverFunComponents.additionalContent(id, regionResults, latestResultsUpdate);
            }
        }
    }

    addSummary(){
        const summaries = []; // {candidate: string, party : Party, count : number}[]
        
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            const regionUpdates = CachedData.updates[this.data.election].filter( update => update.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === winner) || DefaultParty;
                summaries.push({ candidate: party.displayId, party: party, count: 1 });
            }
            else summaries.find( summary => summary.party.id == winner ).count++;
        });


        summaries.sort( (a,b) => {
            return b.count - a.count || a.party.id.localeCompare(b.party.id);
        } );
        
        this.structure.summary.container.appendChild( 
            ElectionSummaryBar.render({ data: summaries, total: 435 })
        );
    }

    fillMap(data){

        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/usa/house-elections/district/' + regionToSlug(region.title);
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
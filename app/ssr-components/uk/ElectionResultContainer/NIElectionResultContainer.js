import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class UKNIElectionResultContainer extends UKElectionResultContainer{
    constructor(elt){
        super(elt, UKNI);
    }

    addSummary(){
        const summaries = []; // {party : Party, count : number}[]

        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            
            const regionUpdates = this.data.updates.filter( update => update.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === winner) || DefaultParty;
                summaries.push({ party: party, count: result.candidates.length });
            }
            else summaries.find( summary => summary.party.id == winner ).count += result.candidates.length;

        });
        summaries.sort( (a,b) => {
            const getCount = (x) => {
                return (["vacant","ind"].includes(x.party.id)) ? -Infinity : x.count;
            }
            return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
            } );
        
        this.structure.summary.container.appendChild( 
            ElectionSummaryBlocs.render({ data: summaries, rowLength: 5 })
        );
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            winningCandidate: () => {},
            additionalContent: (id) => {
                const firstPreferenceResults = CachedData.results[this.data.election]
                    .filter( result => result.id == id && result.subid == 1 )
                    .sort( (a,b) => b.votes - a.votes );

                return [PopupBarGraph.render({ results: firstPreferenceResults, parties: CachedData.parties, title: "First preference votes"})];
            }
        }
    }
    fillMap(data){
        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/uk/northern-ireland-assembly/constituency/' + regionToSlug(region.title);
        }

        super.fillMap(data);
    }

    addMessages(){
        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                case 1: //exit poll      
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        goal: 46/90,
                        format: "n",
                        title: message.link_title
                    }) );
                    break;
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
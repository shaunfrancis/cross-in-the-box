import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        instances.push(
            new HungaryElectionResultContainer(elt)
        );
    }
});

class HungaryElectionResultContainer extends ElectionResultContainer{
    constructor(elt){
        super(elt, HungaryParliamentary);
    }

    addSummary(){
        const summaries = []; // {party : Party, count : number}[]
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            
            const regionUpdates = CachedData.updates[this.data.election].filter( update => update.id == result.id );
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
            ElectionSummaryBlocs.render({ data: summaries, rowLength: 5, blocWidth: "140px" })
        );
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            winningCandidate: (id, regionResults, winner) => {
                const hasMultipleCandidates = regionResults.some( result => result.candidates.length > 1 );
                if(!hasMultipleCandidates) return super.mapHoverFunComponents.winningCandidate(id, regionResults, winner);
            },
            additionalContent: (id, regionResults, latestResultsUpdate) => {
                const popupGraphData = { results: latestResultsUpdate?.results.data || regionResults, parties: CachedData.parties };
                if(this.attributes.showChanges){
                    if(latestResultsUpdate) popupGraphData.title = latestResultsUpdate.results.title.join(" ").replace("- ","-");
                    
                }
                return [PopupBarGraph.render({...popupGraphData, partyWidth: "80px"})]
            }
        }
    }

    fillMap(data){

        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/hungary/parliamentary-elections/constituency/' + regionToSlug(region.title);
        }

        super.fillMap(data);
    }

    addMessages(){
        const urlFun = (slug, type) => {
            let url = "/hungary/";
            switch(type){
                case "parliamentary": url += "parliamentary-elections/"; break;
                default: url += "parliamentary-elections/"
            }
            url += 'constituency/' + regionToSlug(slug);
            return url;
        }

        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                case 1: //exit poll
                    let goal = 100/199;
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        goal: goal,
                        format: "n",
                        title: message.link_title,
                        partyWidth: "80px"
                    }) );
                    break;
                default:
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        title: message.link_title,
                        partyWidth: "80px"
                    }) );
            }
            return messageResults;
        }

        super.addMessages({
            urlFun: urlFun,
            childrenFun: childrenFun,
            timezoneArgs: { timeZone: "Europe/Budapest" },
        });
    }
}
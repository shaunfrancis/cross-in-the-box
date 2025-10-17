import Elt from 'components/shared/_Elt/_Elt';
import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PartyProgressionBlocs from 'components/shared/PartyProgressionBlocs/PartyProgressionBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class UKWalesElectionResultContainer extends UKElectionResultContainer{
    constructor(elt){
        super(elt, UKWales);
    }

    addSummary(){
        const summaries = []; // {party : Party, count : number}[]
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            
            const regionUpdates = this.data.updates.filter( update => update.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === result.party) || DefaultParty;
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

    fillMap(data){
        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/uk/senedd-cymru/constituency/' + regionToSlug(region.title);
        }

        data.hoverFun = (active, popup, id) => {
            if(!active) return;
            popup.innerHTML = "";

            const region = CachedData.regions.find( region => region.id == id );
            const regionResults = CachedData.results[this.data.election]
                .filter( result => result.id == id )
                .sort( (a,b) => b.votes - a.votes );
            const regionUpdates = this.data.updates.filter( update => update.id == region.id );
            const hasMultipleCandidates = regionResults.some( result => result.candidates.length > 1 );

            // Title
            if(!region) return popup.appendChild( new Elt({tag: 'h3', innerHTML: "Missing data"}) );
            popup.appendChild( new Elt({tag: 'h3', innerHTML: region.title}) );

            if(hasMultipleCandidates){
                popup.appendChild( PopupBarGraph.render({ results: regionResults, parties: CachedData.parties }) );
            }
            else{
                // Winning candidate
                const winner = this.winFormula(regionResults)[0];
                let innerHTML = winner?.candidates[0].name;
                if(winner) popup.appendChild( new Elt({tag: 'h4', innerHTML: innerHTML}) );

                // Party progression blocs
                const partyProgression = [CachedData.parties.find( party => party.id === winner?.party ) || DefaultParty];
                regionUpdates.forEach( update => {
                    partyProgression.push( CachedData.parties.find( party => party.id == update.party ) || DefaultParty );
                });
                if(partyProgression.length > 1) popup.appendChild( PartyProgressionBlocs.render({ parties: partyProgression }) );

                // Bar graph
                popup.appendChild( PopupBarGraph.render({ results: regionResults, parties: CachedData.parties }) );
            }
        };

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
                        goal: 31/60,
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
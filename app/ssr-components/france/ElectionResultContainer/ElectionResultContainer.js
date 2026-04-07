import ElectionSummaryBar from 'components/shared/ElectionSummaryBar/ElectionSummaryBar';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        instances.push(
            new FranceElectionResultContainer(elt)
        );
    }
});

class FranceElectionResultContainer extends ElectionResultContainer{
    constructor(elt){
        super(elt, FrancePresidential);
        this.data.round = this.structure.container.getAttribute('data-round');
    }

     winFormula(results){
        return super.winFormula(results.filter(result => result.subid == this.data.round));
    }

    createSummaries(){
        const summaries = []; // {party : Party, count : number}[]
        let totalVotes = 0;
        CachedData.results[this.data.election].filter(result => result.subid == this.data.round).forEach( result => {
            const party = CachedData.parties.find( party => party.id === result.party) || DefaultParty;
            const existingSummary = summaries.find( summary => summary.party === party);
            if(!existingSummary) summaries.push({
                candidate: result.candidates[0].name,
                displayCandidate: result.candidates[0].name.split(" ").slice(1).join(" "),
                party: party,
                count: result.votes
            });
            else existingSummary.count += result.votes;
            totalVotes += result.votes;
        });
        summaries.forEach( summary => {
            summary.displayCount = (100 * (summary.count / totalVotes)).toFixed(2) + "%";
        });
        summaries.sort( (a,b) => b.count - a.count );
        return summaries;
    }

    addSummary(){
        const summaries = this.createSummaries();
        this.structure.summary.container.appendChild( 
            ElectionSummaryBar.render({ data: summaries, prioritisePartyDisplay: true })
        );
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            winningCandidate: (id, regionResults, winner) => {
                return super.mapHoverFunComponents.winningCandidate(
                    id, regionResults.filter(result => result.subid == this.data.round), winner
                );
            },

            additionalContent: (id) => {
                const roundResults = CachedData.results[this.data.election]
                    .filter( result => result.id == id && result.subid == this.data.round )
                    .sort( (a,b) => b.votes - a.votes );

                return [PopupBarGraph.render({ results: roundResults, parties: CachedData.parties})];
            }
        }
    }
    fillMap(data){

        data.clickFun = (event, id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) openWindow(event, '/france/presidential-elections/department/' + regionToSlug(region.title));
        }

        super.fillMap(data);
    }

    addMessages(){
        const urlFun = (slug, type) => {
            let url = "/france/";
            switch(type){
                case "presidential": url += "presidential-elections/"; break;
                default: url += "presidential-elections/"
            }
            url += 'department/' + regionToSlug(slug);
            return url;
        }

        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                case 1: //exit poll
                    let goal = 1/2;
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
            timezoneArgs: { timeZone: "Europe/Paris" },
        });
    }
}
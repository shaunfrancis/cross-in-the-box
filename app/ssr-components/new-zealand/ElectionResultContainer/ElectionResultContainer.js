import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        instances.push(
            new NZElectionResultContainer(elt)
        );
    }
});

class NZElectionResultContainer extends ElectionResultContainer{
    constructor(elt){
        super(elt, NZGeneral);
    }

    fillMap(data){

        data.clickFun = (event, id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) openWindow(event, '/new-zealand/general-elections/electorate/' + regionToSlug(region.title));
        }

        data.loadFun = (mapContainer, electionResultContainer) => {
            const svg = mapContainer.querySelector('svg');
            if(!svg) return;

            // add overhang list seats
            let standardNumber;
            switch(this.data.election){
                case "2017": case "2014": standardNumber = 49; break;
                case "2023": case "2020": default: standardNumber = 48;
            }
            const listCount = data.fills.filter(f => f.id === "LIST").length;
            const listGroup = mapContainer.querySelector(`g[name="LIST"]`);
            for(let i = standardNumber + 1; i <= listCount; i++){
                const existingRect = mapContainer.querySelector(`rect[data-overhang="${i}"]`);
                if(existingRect) continue;

                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttributeNS(null, "data-overhang", i);
                rect.setAttributeNS(null, "width", 1);
                rect.setAttributeNS(null, "height", 1);
                rect.setAttributeNS(null, "x", 17 + ((i - 1) % 5));
                rect.setAttributeNS(null, "y", 19 + Math.floor( (i - 46) / 5 ) );
                listGroup.appendChild(rect);
            }
        }

        super.fillMap(data);
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            winningCandidate: (id, regionResults, winner) => {
                const hasMultipleCandidates = regionResults.some( result => result.candidates.length > 1 );
                if(!hasMultipleCandidates) return super.mapHoverFunComponents.winningCandidate(id, regionResults, winner);
            },
            additionalContent: (id, regionResults, latestResultsUpdate) => {
                const results = latestResultsUpdate?.results.data || regionResults;
                const subElections = getResultsBySubElection(results);
                return [PopupBarGraph.render({
                    results: subElections.length === 1 ? results : subElections.find(s => s.subid === "E").results,
                    parties: CachedData.parties,
                    partyWidth: "80px"
                })];
            }
        }
    }

    addMessages(){
        const urlFun = (slug, type) => {
            let url = "/new-zealand/";
            switch(type){
                case "general": default: url += "general-elections/";
            }
            url += 'electorate/' + regionToSlug(slug);
            return url;
        }

        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                case 1: //exit poll
                    let goal = 1/2;
                    switch(this.data.election){
                        case "2025": goal = 172/343; break;
                        case "2021": case "2019": case "2015": goal = 170/338; break;
                    }
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        goal: goal,
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

        super.addMessages({ urlFun: urlFun, childrenFun: childrenFun });
    }
}
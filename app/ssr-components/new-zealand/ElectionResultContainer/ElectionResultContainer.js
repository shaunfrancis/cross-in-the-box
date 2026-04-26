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

        super.fillMap(data);
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            additionalContent: (id, regionResults, latestResultsUpdate) => {
                const results = latestResultsUpdate?.results.data || regionResults;
                return [PopupBarGraph.render({
                    results: getResultsBySubElection(results).find(s => s.subid === "E").results,
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
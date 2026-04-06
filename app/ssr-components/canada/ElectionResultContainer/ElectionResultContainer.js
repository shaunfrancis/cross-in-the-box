import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        instances.push(
            new CanadaElectionResultContainer(elt)
        );
    }
});

class CanadaElectionResultContainer extends ElectionResultContainer{
    constructor(elt){
        super(elt, CanadaFederal);
    }

    fillMap(data){

        data.clickFun = (event, id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) openWindow(event, '/canada/federal-elections/riding/' + regionToSlug(region.title));
        }

        super.fillMap(data);
    }

    addMessages(){
        const urlFun = (slug, type) => {
            let url = "/canada/";
            switch(type){
                case "federal": url += "federal-elections/"; break;
                default: url += "federal-elections/"
            }
            url += 'riding/' + regionToSlug(slug);
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
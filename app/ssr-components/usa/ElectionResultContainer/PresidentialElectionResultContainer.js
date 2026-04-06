import ElectionSummaryBar from 'components/shared/ElectionSummaryBar/ElectionSummaryBar';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class USAPresidentialElectionResultContainer extends USAElectionResultContainer{
    constructor(elt){
        super(elt, USAPresidential);
    }

    addSummary(){
        const summaries = this.createSummaries({ preferCandidateNames: true });
        this.structure.summary.container.appendChild( 
            ElectionSummaryBar.render({ data: summaries, total: 538 })
        );
    }

    fillMap(data){

        data.clickFun = (event, id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) openWindow(event, '/usa/presidential-elections/state/' + regionToSlug(region.title));
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
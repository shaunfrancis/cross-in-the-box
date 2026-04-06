import ElectionSummaryBar from 'components/shared/ElectionSummaryBar/ElectionSummaryBar';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class USAHouseElectionResultContainer extends USAElectionResultContainer{
    constructor(elt){
        super(elt, USAHouse);
    }

    addSummary(){
        const summaries = this.createSummaries();
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
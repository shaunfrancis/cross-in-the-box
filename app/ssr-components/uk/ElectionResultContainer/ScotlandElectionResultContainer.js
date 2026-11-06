import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class UKScotlandElectionResultContainer extends UKElectionResultContainer{
    constructor(elt){
        super(elt, UKScotland);
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            winningCandidate: (id, regionResults, winner) => {
                const hasMultipleCandidates = regionResults.some( result => result.candidates.length > 1 );
                if(!hasMultipleCandidates) return super.mapHoverFunComponents.winningCandidate(id, regionResults, winner);
            }
        }
    }
    fillMap(data){
        data.clickFun = (event, id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) openWindow(event, '/uk/scottish-parliament/constituency/' + regionToSlug(region.title));
        }
        super.fillMap(data);
    }

    addMessages(){
        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                case 2: //seats won
                    messageResults.push( PopupBarGraph.render({
                        results: message.results
                        .filter( result => "elected" in result && result.elected > 0 )
                        .map(result => {
                            result.votes = result.elected;
                            return result;
                        })
                        .sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        format: "n",
                        title: message.link_title
                    }) );
                    break;
                case 1: //exit poll      
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        goal: 65/129,
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
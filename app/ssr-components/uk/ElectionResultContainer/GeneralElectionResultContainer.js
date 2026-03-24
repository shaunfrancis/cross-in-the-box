import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class UKGeneralElectionResultContainer extends UKElectionResultContainer{
    constructor(elt){
        super(elt, UKGeneral);
    }

    winFormula(results){
        switch(this.winFormulaName){
            case "con-ref-combined": {
                CachedData.parties.push({
                    id: "custom_conref",
                    displayId: "BLUE",
                    color: "#089CD7"
                });

                let regionResults = [];
                results.forEach(result => {
                    if(!(result.id in regionResults)) regionResults[result.id] = {results: [], con: 0, ref: 0};
                    if(["con","ref"].includes(result.party)){
                        regionResults[result.id][result.party] = result.votes;
                    }
                    else regionResults[result.id].results.push(result);
                });
                regionResults = regionResults.map( regionResult => {
                    const results = regionResult.results;
                    results.push({ id: regionResult.results[0].id, party: "custom_conref", votes: regionResult.con + regionResult.ref });
                    return results;
                });

                const winners = [];
                Object.values(regionResults).forEach( regionResult => {
                    winners.push(
                        regionResult.reduce( (max, result) => {
                            return result.votes > max.votes ? result : max;
                        })
                    );
                });
                
                return winners;
            }

            default:
                return super.winFormula(results);
        }
    }

    fillMap(data){

        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/uk/general-elections/constituency/' + regionToSlug(region.title);
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
                        goal: 326/650,
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
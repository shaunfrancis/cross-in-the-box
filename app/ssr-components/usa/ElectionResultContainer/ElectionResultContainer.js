window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        switch(elt.getAttribute('data-regions-type')){
            case "house":
                instances.push(new USAHouseElectionResultContainer(elt));
                break;
            case "senate":
                instances.push(new USASenateElectionResultContainer(elt));
                break;
            case "gubernatorial":
                instances.push(new USAGubernatorialElectionResultContainer(elt));
                break;
            case "presidential": default: 
                instances.push(new USAPresidentialElectionResultContainer(elt));
        }
    }
});

class USAElectionResultContainer extends ElectionResultContainer{
    addMessages(options){
        const urlFun = (slug, type) => {
            let url = "/usa/";
            switch(type){
                case "senate": url += "senate-elections/state/"; break;
                case "house": url += "house-elections/district/"; break;
                case "gubernatorial": url += "gubernatorial-elections/state/"; break;
                case "presidential": default: url += "presidential-elections/state/"
            }
            url += regionToSlug(slug);
            return url;
        }

        super.addMessages({
            urlFun: urlFun,
            timezoneArgs: { timeZone: "US/Eastern" },
            ...options
        });
    }

     get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            additionalContent: (id, regionResults, latestResultsUpdate) => {
                const results = latestResultsUpdate?.results.data || regionResults;
                const params = {parties: CachedData.parties, partyWidth: "80px"};

                const subElections = getResultsBySubElection(results);
                if(subElections.length === 1){
                    const popupGraphData = { results: results, ...params };
                    if(this.attributes.showChanges && latestResultsUpdate){
                        popupGraphData.title = latestResultsUpdate.results.title.join(" ").replace("- ","-");
                    }
                    return [PopupBarGraph.render(popupGraphData)]
                }

                else switch(getBaseId(id)){
                    case "LA":
                        return [
                            PopupBarGraph.render({ title: "Runoff", results: subElections[1].results, ...params }),
                            PopupBarGraph.render({ title: "Jungle primary", results: subElections[0].results, ...params })
                        ];
                    case "GA": case "MS":
                        return [
                            PopupBarGraph.render({ title: "Runoff", results: subElections[1].results, ...params }),
                            PopupBarGraph.render({ title: "First round", results: subElections[0].results, ...params })
                        ];
                    case "AK": case "ME":
                        return [PopupBarGraph.render({
                            results: subElections[subElections.length - 1].results,
                            title: "Final round results",
                            ...params
                        })];
                    default: // should never get here but fail gracefully
                        return subElections.map( (election, index) => {
                            return PopupBarGraph.render({
                                title: "Round " + (index + 1),
                                results: election.results,
                                ...params
                            });
                        });
                }
            }
        }
    }
}
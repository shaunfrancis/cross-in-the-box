window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        switch(elt.getAttribute('data-type')){
            case "scotland":
                instances.push( new ScotlandRegionSearchSection(elt) );
                break;
            case "general": default:
                instances.push( new GeneralRegionSearchSection(elt) );
        }
    }
});

class GeneralRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/uk/"){
        super(elt, path, "general");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/uk/general-elections/constituency/' + regionToSlug(region.title),
                abolishedLabel: "Abolished constituency",
                winnerLabel: "MP"
            });
        });
    }
}
class ScotlandRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/uk/"){
        super(elt, path, "scotland");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/uk/scottish-parliament/constituency/' + regionToSlug(region.title),
                abolishedLabel: "Abolished constituency",
                winnerLabel: "MSP"
            });
        });
    }
}
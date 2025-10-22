window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        switch(elt.getAttribute('data-type')){
            case "scotland":
                instances.push( new ScotlandRegionSearchSection(elt) );
                break;
            case "wales":
                instances.push( new WalesRegionSearchSection(elt) );
                break;
            case "ni":
                instances.push( new NIRegionSearchSection(elt) );
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
class WalesRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/uk/"){
        super(elt, path, "wales");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/uk/senedd-cymru/constituency/' + regionToSlug(region.title),
                abolishedLabel: "Abolished constituency",
                winnerLabel: "MS"
            });
        });
    }
}
class NIRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/uk/"){
        super(elt, path, "ni");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/uk/northern-ireland-assembly/constituency/' + regionToSlug(region.title),
                abolishedLabel: "Abolished constituency",
                winnerLabel: "MLA"
            });
        });
    }
}
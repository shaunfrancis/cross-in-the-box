window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        switch(elt.getAttribute('data-type')){
            case "house":
                instances.push( new HouseRegionSearchSection(elt) );
                break;
            case "senate":
                instances.push( new SenateRegionSearchSection(elt) );
                break;
            case "gubernatorial":
                instances.push( new GubernatorialRegionSearchSection(elt) );
                break;
            case "presidential": default:
                instances.push( new PresidentialRegionSearchSection(elt) );
        }
    }
});

class PresidentialRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/usa/"){
        super(elt, path, "presidential");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/usa/presidential-elections/state/' + regionToSlug(region.title),
                winnerLabel: "winner"
            });
        });
    }
}
class SenateRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/usa/"){
        super(elt, path, "senate");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/usa/senate-elections/state/' + regionToSlug(region.title),
                winnerLabel: "senator"
            });
        });
    }
}
class HouseRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/usa/"){
        super(elt, path, "house");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/usa/house-elections/district/' + regionToSlug(region.title),
                winnerLabel: "representative"
            });
        });
    }
}
class GubernatorialRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/usa/"){
        super(elt, path, "gubernatorial");
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/usa/gubernatorial-elections/state/' + regionToSlug(region.title),
                winnerLabel: "governor"
            });
        });
    }
}
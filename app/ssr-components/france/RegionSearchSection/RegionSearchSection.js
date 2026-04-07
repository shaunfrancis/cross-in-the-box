window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        instances.push(
            new FranceRegionSearchSection(elt)
        );
    }
});

class FranceRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/france/"){
        super(elt, path);
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/france/presidential-elections/department/' + regionToSlug(region.title)
            });
        });
    }
}
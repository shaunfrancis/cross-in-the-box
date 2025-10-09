window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        instances.push(
            new CanadaRegionSearchSection(elt)
        );
    }
});

class CanadaRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/canada/"){
        super(elt, path);
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/canada/federal-elections/riding/' + regionToSlug(region.title),
                abolishedLabel: "Abolished riding",
                winnerLabel: "MP"
            });
        });
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        instances.push(
            new NewZealandRegionSearchSection(elt)
        );
    }
});

class NewZealandRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/nz/"){
        super(elt, path);
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/new-zealand/general-elections/electorate/' + regionToSlug(region.title),
                abolishedLabel: "Abolished electorate",
                winnerLabel: "MP"
            });
        });
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        instances.push(
            new HungaryRegionSearchSection(elt)
        );
    }
});

class HungaryRegionSearchSection extends RegionSearchSection{
    constructor(elt, path = Endpoint + "/search/hungary/"){
        super(elt, path);
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/hungary/parliamentary-elections/constituency/' + regionToSlug(region.title),
                abolishedLabel: "Abolished constituency",
                winnerLabel: "MP"
            });
        });
    }
}
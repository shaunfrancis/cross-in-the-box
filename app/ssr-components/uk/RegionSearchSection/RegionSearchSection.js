window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.RegionSearchSection')){
        instances.push(
            new UKRegionSearchSection(elt)
        );
    }
});

class UKRegionSearchSection extends RegionSearchSection{
    constructor(elt){
        super(elt);
        this.structure.search.input.addEventListener('input', async (event) => {
            const query = event.target.value;
            const searchResults = await this.search(query);
            if(searchResults) this.addResults(searchResults, query, {
                resultsHref: (region) => '/uk/general-elections/constituency/' + constituencyToSlug(region.title),
                abolishedLabel: "Abolished constituency",
                winnerLabel: "MP"
            });
        });
    }
}
class RegionSearchSection{
    constructor(elt){
        this.structure = this.hydrate(elt);
        this.handler = new RegionSearchHandler(Endpoint + "/search/uk/");
    }

    hydrate(elt){
        const input = elt.querySelector('.RegionSearchSection__search-input');
        input.addEventListener('mouseup', (event) => {
            event.target.setSelectionRange(0, event.target.value.length);
        });

        return {
            container: elt,
            search: {
                container: elt.querySelector('.RegionSearchSection__search-container'),
                input: input,
            },
            status: {
                container: elt.querySelector('.RegionSearchSection__status-container'),
            },
            results: {
                container: elt.querySelector('.RegionSearchSection__results-container'),
            },
        };
    }

    set status(message){
        this.structure.status.container.innerHTML = message;
    }

    async search(query){
        if(query.length >= 3) this.status = "Searching&hellip;";
        else this.status = "";
        
        const searchResults = await this.handler.search(query);
        
        if(searchResults && searchResults.regions.length + searchResults.candidates.length == 0) this.status = "No results found.";
        else this.status = "";

        return searchResults;
    }

    addResults(
        { regions, candidates },
        query,
        { resultsHref = (region) => "#", abolishedLabel = "Abolished" },
        start = 0
    ){

        const highlightRelevance = (query, title) => {
            const words = query.split(/ |-|—/g);
            words.sort( (a,b) => b.length - a.length );
            
            let regexPattern = "(";
            words.forEach( (word, index) => {
                regexPattern += (index == 0 ? "" : "|") + word.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            })
            regexPattern += ")";

            const spans = [];
            const accentInsensitiveTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            let index = 0;
            accentInsensitiveTitle.split( new RegExp(regexPattern, "gi") ).forEach( (fragment, key) => {
                if(fragment != ""){
                    const accentedFragment = title.substring(index, index + fragment.length);
                    index += fragment.length;
                    spans.push(
                        new Elt({ tag: 'span', style: key % 2 ? {} : { color: "#666" }, innerHTML: accentedFragment })
                    );
                }
            });
            
            return spans;
        };

        if(start === 0) this.structure.results.container.innerHTML = "";

        for(let index = start; index < regions.length + candidates.length; index++){
            if(index >= start + 15){
                const moreButton = this.structure.results.container.appendChild(
                    new Elt({
                        tag: 'button',
                        classList: ["RegionSearchSection__load-button", "button"],
                        innerHTML: "Show more"
                    })
                );
                moreButton.addEventListener('click', () => {
                    moreButton.remove();
                    this.addResults({ regions, candidates }, query, { resultsHref, abolishedLabel }, start + 15);
                });
                break;
            }

            const region = [...regions, ...candidates][index];

            const a = new Elt({
                tag: 'a',
                href: resultsHref(region),
                classList: ["RegionSearchSection__result", "unstyled"],
            });
            
            if(index < regions.length){ // region
                a.append(...[
                    new Elt({
                        tag: 'h2',
                        classList: ["RegionSearchSection__result-title"],
                        children: highlightRelevance(query, region.title)
                    }),
                    !region.current ? new Elt({ tag: 'span', style: { color: "#666" }, innerHTML: abolishedLabel}) : null
                ].filter(Boolean));
            }
            else{ // candidate region
                a.append(...[
                    new Elt({
                        tag: 'h2', classList: ["RegionSearchSection__result-title"], children: [
                            new Elt({
                                tag: 'div',
                                classList: ["RegionSearchSection__title-bloc"],
                                style: {background: region.party.color || "var(--default-color)", color: region.party.textColor}, innerHTML: partyIdToDisplayId(region.party.id)
                            }),
                            ...highlightRelevance(query, region.candidate)
                        ]
                    }),
                    new Elt({
                        tag: 'span',
                        style: { color: "#666" },
                        innerHTML: region.title + " candidate, " + region.election.join(" ")
                    })
                ]);
            }
            this.structure.results.container.append(a);
        };

    }

}

class RegionSearchHandler extends SearchHandler{
    constructor(url, suffix = ""){
        super(url, suffix);
    }

    async search(query){
        const results = await super.search(query);
        if(results){
            const precedence = (result) => {
                const words = query.split(/ |-|—/g);
                words.sort( (a,b) => b.length - a.length );
                
                let regexPattern = "(";
                words.forEach( (word, index) => {
                    regexPattern += (index == 0 ? "" : "|") + word.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
                })
                regexPattern += ")";

                let intersections = 0;
                result
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, '')
                    .split( new RegExp(regexPattern, "gi") )
                    .forEach( (fragment, index) => {
                        if(index % 2) intersections += fragment.length;
                    }
                );
                
                return intersections;
            };
            results.regions.sort( (a, b) =>  precedence(b.title) - precedence(a.title) );
            results.candidates.sort( (a, b) =>  precedence(b.candidate) - precedence(a.candidate) );
        }
        return results;
    }
}
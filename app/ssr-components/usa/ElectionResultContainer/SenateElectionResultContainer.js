import Elt from 'components/shared/_Elt/_Elt';
import ElectionSummaryBar from 'components/shared/ElectionSummaryBar/ElectionSummaryBar';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

class USASenateElectionResultContainer extends USAElectionResultContainer{
    constructor(elt){
        super(elt, USASenate);
    }

    async downloadData({ election, regionsType = null }, { messageGroup, showChanges }){
    
        if(
            CachedData.regions.length === 0 || 
            (regionsType != null && CachedData.regions.filter( region => region.type == regionsType ).length == 0)
        ) await CachedData.fetchRegions(regionsType);

        if(CachedData.parties.length === 0) await CachedData.fetchParties();

        for(let i = 0; i <= 2; i++){
            const senateElectionId = "S" + (parseInt(election.substring(1)) - 2*i);
            if(!CachedData.elections[senateElectionId]) await CachedData.fetchElection(senateElectionId);
            if(!CachedData.results[senateElectionId]) await CachedData.fetchResults(senateElectionId);
            if(!CachedData._updates[senateElectionId]) await CachedData.fetchUpdates(senateElectionId);
        }

        if(messageGroup && !CachedData.messages[messageGroup]) await CachedData.fetchMessages(messageGroup);
    }

    regionSelector(id, _){
        switch(this.visibleMap.type){
            case "geographic":
                const classlessId = id.substring(0, id.length - 1);
                return `path[name="${classlessId}"]`;

            case "cartographic": default:
                return `rect[name="${id}"]`;
        }
    }

    updateMap(_){
        const stripePatterns = []; // {id: string, colors:[string, string]}[]
        let newFills = []; // {id: string, color: string, opacity?: number}[]

        for(let electionIndex = 2; electionIndex >= 0; electionIndex--){
            if(this.visibleMap.type === "geographic" && electionIndex !== 0) continue;

            const senateElectionId = "S" + (parseInt(this.data.election.substring(1)) - 2*electionIndex);

            const regionCounts = {};
            const winners = this.winFormula(CachedData.results[senateElectionId]);
            winners.forEach( result => {
                if(!regionCounts[result.id]) regionCounts[result.id] = {total: result.candidates?.length ?? 1};
                else regionCounts[result.id].total += result.candidates?.length ?? 1;
            });
            winners.forEach( result => {
                for(let i = 0; i < (result.candidates?.length ?? 1); i++){
                    regionCounts[result.id].current = (regionCounts[result.id].current || 0) + 1;
                    const selector = regionCounts[result.id].total === 1 ? null : regionCounts[result.id].current;

                    const fill = (id, color) => {
                        return {
                            id: id,
                            selector: this.regionSelector(id, selector),
                            color: color || "var(--default-color)",
                            opacity: electionIndex !== 0 ? 0.33 : undefined
                        }
                    };

                    const regionUpdates = CachedData.updates[senateElectionId].filter( update => {
                        return update.id == result.id && update.date <= CachedData.elections[this.data.election].date;
                    });
                    if(regionUpdates.length > 0){
                        const latestUpdate = regionUpdates[regionUpdates.length - 1];
                        const party = CachedData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                        if(party){
                            newFills = newFills.filter(f => f.id != latestUpdate.id);
                            newFills.push(fill(latestUpdate.id, party.color));
                        }
                    }
                    else{
                        const party = CachedData.parties.find( p => p.id == result.party ) || DefaultParty;
                        if(party){

                            // diagonal stripes if geographic and two different winners in the same year
                            const existingNewFill = newFills.find(f => {
                                return f.id.substring(0, result.id.length - 1) === result.id.substring(0, result.id.length - 1);
                            });
                            if(this.visibleMap.type === "geographic" && existingNewFill && existingNewFill.color !== party.color){
                                const patternId = 
                                    (existingNewFill.color || "var(--default-color)").replace(/[\#\(\)\,]/g, "_") + 
                                    "_" +
                                    (party.color || "var(--default-color)").replace(/[\#\(\)\,]/g, "_");
                                    
                                if(!(stripePatterns.find(pattern => pattern.id === patternId))) stripePatterns.push({
                                    id: patternId,
                                    colors: [existingNewFill.color, party.color]
                                });

                                existingNewFill.color = `url(#diagonal_pattern_${patternId})`;
                                newFills.push(fill(result.id, `url(#diagonal_pattern_${patternId})`));
                            }

                            else{
                                newFills = newFills.filter(f => f.id != result.id);
                                newFills.push(fill(result.id, party.color));
                            }
                        }
                    }
                };
            });
        }
        this.fillMap({ regions: CachedData.regions, fills: newFills, stripePatterns: stripePatterns });
    }

    addSummary(){
        const summaries = []; // {candidate: string, party : Party, count : number}[]
        
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            const regionUpdates = CachedData.updates[this.data.election].filter( update => update.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === winner) || DefaultParty;
                summaries.push({ candidate: party.displayId, party: party, count: 1 });
            }
            else summaries.find( summary => summary.party.id == winner ).count++;
        });


        summaries.sort( (a,b) => {
            return b.count - a.count || a.party.id.localeCompare(b.party.id);
        } );
        
        this.structure.summary.container.appendChild( 
            ElectionSummaryBar.render({ data: summaries, total: 100 })
        );
    }

    get mapHoverFunComponents(){
        return { ...super.mapHoverFunComponents, 
            title: (id, region) => {
                if(!region){
                    const classedRegion = CachedData.regions.find( r => r.id.substring(0, r.id.length - 1) === id);
                    if(this.visibleMap.type === "geographic" && classedRegion){
                        return new Elt({tag: 'h3', innerHTML: classedRegion.title.replace(/ \(class \d\)/g, '')});
                    }
                    return new Elt({tag: 'h3', innerHTML: "Missing data"});
                }
                else return new Elt({tag: 'h3', innerHTML: region.title});
            },
            winningCandidate: (id, regionResults, winner) => {
                if(winner) return super.mapHoverFunComponents.winningCandidate(id, regionResults, winner);
                else if(this.visibleMap.type === "geographic") return new Elt({
                    tag: 'h4',
                    innerHTML: "No election this year"
                });
                // previous cartographic winner created in additionalContent below instead
            },
            additionalContent: (id, regionResults, latestResultsUpdate) => {
                if(regionResults.length === 0){
                    if(this.visibleMap.type === "geographic") return [];
                    // else if cartographic, find previously elected candidate and party:
                    const previouslyElectedHTML = (candidate, party, year) => {
                        return [
                            new Elt({tag: 'h4', innerHTML: candidate}),
                            new Elt({tag: 'div', classList: ["ElectionResultContainer__flex-row"], children: [
                                new Elt({
                                    tag: 'div',
                                    classList: ["ElectionResultContainer__bloc"],
                                    style: {background: (party.color || "var(--default-color)"), color: party.textColor},
                                    innerHTML: party.displayId
                                }),
                                new Elt({ tag: 'span', innerHTML: "elected in " + year }),
                            ]}),
                        ]
                    }
                    for(let electionIndex = 1; electionIndex <= 2; electionIndex++){
                        const senateYear = parseInt(this.data.election.substring(1)) - 2*electionIndex;
                        const senateElectionId = "S" + senateYear;
                        
                        const updates = CachedData.updates[senateElectionId].filter( update => {
                            return update.id == id && update.date <= CachedData.elections[this.data.election].date;
                        });
                        if(updates.length > 0){
                            const latestUpdate = updates[updates.length - 1];
                            const party = CachedData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                            const winners = this.winFormula(latestUpdate.results.data);
                            if(winners.length > 0) return previouslyElectedHTML(winners[0].candidates[0].name, party, latestUpdate.date.getFullYear());
                        }
                        else{
                            const results = CachedData.results[senateElectionId].filter( result => result.id === id );
                            if(results.length > 0){
                                const winners = this.winFormula(results);
                                if(winners.length > 0){
                                    const party = CachedData.parties.find( p => p.id == winners[0].party ) || DefaultParty;
                                    return previouslyElectedHTML(winners[0].candidates[0].name, party, senateYear);
                                }
                            }
                        }
                    }
                    return [];
                }

                const popupGraphData = { results: latestResultsUpdate?.results.data || regionResults, parties: CachedData.parties };
                if(this.attributes.showChanges){
                    if(latestResultsUpdate) popupGraphData.title = latestResultsUpdate.results.title.join(" ").replace("- ","-");
                    
                }
                return [PopupBarGraph.render({...popupGraphData, partyWidth: "80px"})]
            }
        }
    }

    fillMap(data){

        data.clickFun = (id) => {
            let region = CachedData.regions.find( r => r.id == id );
            if(region) window.location.href = '/usa/senate-elections/state/' + regionToSlug(region.title);
        }

        data.loadFun = (container) => {
            const svg = container.querySelector('svg');
            if(!svg) return;

            // add stars for special elections on cartographic map
            if(this.visibleMap.type === "cartographic") data.fills
                .filter( f => (f.opacity == 1 || !f.opacity) && f.id.slice(-1) != container.getAttribute('data-class-no') )
                .forEach( special => {
                    const rect = container.querySelector(`rect[name="${special.id}"]`),
                    existingStar = container.querySelector(`path[name=${special.id}]`);
                    if(!rect || existingStar) return;

                    const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const x = rect.getAttributeNS(null, "x"), y = rect.getAttributeNS(null, "y");
                    star.setAttribute('name', special.id);
                    star.setAttribute('d', `M${x} ${y}m25 32.5l 8.817 6.135l -3.111 -10.281l 8.56 -6.489l -10.739 -0.219l -3.527 -10.146l -3.527 10.146l -10.739 0.219l 8.56 6.489l -3.111 10.281l 8.817 -6.135`);
                    svg.appendChild(star);
            });

            // add diagonal stripes for two elections in the same state with different outcomes on geographic map
            if(this.visibleMap.type === "geographic" && "stripePatterns" in data) data.stripePatterns.forEach( pattern => {
                const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                linearGradient.setAttribute('id', "diagonal_pattern_" + pattern.id);
                linearGradient.setAttributeNS(null, 'gradientTransform', "rotate(-135)");
                linearGradient.setAttributeNS(null, 'spreadMethod', "repeat");
                for(let i = 0; i <= 7; i++){
                    const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop.setAttributeNS(null, 'stop-color', [0,3,4].includes(i) ? (pattern.colors[0] || "var(--default-color)") : (pattern.colors[1] || "var(--default-color)"));
                    stop.setAttributeNS(null, 'offset', (Math.floor(i/2) + 1) * 25 + "%");
                    linearGradient.appendChild(stop);
                }
                let defs = container.querySelector('defs') || svg.appendChild( document.createElementNS('http://www.w3.org/2000/svg', 'defs') );
                defs.appendChild(linearGradient);
            });
        }

        super.fillMap(data);
    }

    addMessages(){
        const childrenFun = (message) => {
            let messageResults = [];
            if(message.results) switch(message.result_type){
                default:
                    messageResults.push( PopupBarGraph.render({
                        results: message.results.sort( (a,b) => b.votes - a.votes ),
                        parties: CachedData.parties,
                        title: message.link_title
                    }) );
            }
            return messageResults;
        }

        super.addMessages({ childrenFun: childrenFun });
    }
}
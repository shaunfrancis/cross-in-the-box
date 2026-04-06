import Message from "components/shared/Message/Message";
import PartyProgressionBlocs from "components/shared/PartyProgressionBlocs/PartyProgressionBlocs";

class ElectionResultContainer{

    static observer;
    static elementMaps = new WeakMap();

    constructor(elt, MapClass){
        this.structure = this.hydrate(elt);
        this.winFormulaName = this.structure.container.getAttribute('data-win-formula');

        this.data = {
            election: this.structure.container.getAttribute('data-election'),
            regionsType: this.structure.container.getAttribute('data-regions-type'),
            messageGroup: this.structure.messages.container?.getAttribute('data-group'),
            showChanges: this.structure.container.getAttribute('data-show-changes')
        };
        this.structure.container.removeAttribute('data-election');
        this.structure.container.removeAttribute('data-regions-type');

        Toggle.register('map-type', (bool) => {
            const map = this.maps.find(map => 
                map.type === (bool ? "geographic" : "cartographic")
            );
            if(map) map.show();
        });

        this.maps = (this.structure.maps.types).map(container => {
            const instance = new MapClass(container, this, { election: this.data.election, type: container.getAttribute('data-map-type'), src: container.getAttribute('data-src') });
            container.removeAttribute('data-map-type');
            container.removeAttribute('data-src');
            return instance;
        });

        this.constructor.elementMaps.set(this.structure.container, this);
        if(!this.constructor.observer) this.constructor.observer = new IntersectionObserver( (entries, observer) => {
            entries.forEach( async entry => {
                if(entry.isIntersecting){
                    observer.unobserve(entry.target);
                    const instance = ElectionResultContainer.elementMaps.get(entry.target);
                    if(instance){
                        ElectionResultContainer.elementMaps.delete(entry.target);
                        await instance.downloadData(instance.data);
                        instance.addSummary();
                        instance.updateMap(instance.data.showChanges);
                        if(CachedData.messages[instance.data.messageGroup]) instance.addMessages();
                    }
                }
            });
        });
        
        this.constructor.observer.observe(this.structure.container);
    }

    get visibleMap(){
        return this.maps.find(map => map.visible) || this.maps[0];
    }

    get mapHoverFunComponents(){
        return {
            title: (id, region) => {
                if(!region) return new Elt({tag: 'h3', innerHTML: "Missing data"});
                else return new Elt({tag: 'h3', innerHTML: region.title});
            },
            winningCandidate: (id, regionResults, winner) => {
                let innerHTML = winner?.candidates[0].name;
                if(this.winFormulaName === "second-place") innerHTML += " in second place";
                if(winner) return new Elt({tag: 'h4', innerHTML: innerHTML});
            },
            additionalContent: (id, regionResults, latestResultsUpdate, election) => {
                const popupGraphData = { results: latestResultsUpdate?.results.data || regionResults, parties: CachedData.parties };
                if(this.data.showChanges){
                    if(latestResultsUpdate) popupGraphData.title = latestResultsUpdate.results.title.join(" ").replace("- ","-");
                }
                return [PopupBarGraph.render(popupGraphData)]
            }
        }
    }

    fillMap(data){

        const hoverFun = (active, popup, id) => {
            if(!active) return;
            popup.innerHTML = "";

            const region = CachedData.regions.find( region => region.id == id );
            const regionResults = CachedData.results[this.data.election]
                .filter( result => result.id == id )
                .sort( (a,b) => b.votes - a.votes );
            const regionAttributes = CachedData.attributes.filter( attr => attr.region_id == region.id && attr.applies_to == this.data.election );
            const regionUpdates = CachedData.updates[this.data.election].filter( update => update.id == region.id );
            const latestResultsUpdate = this.data.showChanges && regionUpdates.find( update => update.results );
            latestResultsUpdate?.results.data.sort( (a,b) => b.votes - a.votes );


            // Title
            popup.appendChild( this.mapHoverFunComponents.title(id, region) );

            // Winning candidate
            const winner = this.winFormula(latestResultsUpdate?.results.data || regionResults)[0];
            const initialWinner = !latestResultsUpdate ? winner : this.winFormula(regionResults)[0];
            const winnerElt = this.mapHoverFunComponents.winningCandidate(id, regionResults, winner);
            if(winnerElt) popup.appendChild(winnerElt);

            if(this.data.showChanges){
                // Party progression blocs
                const partyProgression = [CachedData.parties.find( party => party.id === initialWinner?.party ) || DefaultParty];
                regionUpdates.forEach( update => {
                    partyProgression.push( CachedData.parties.find( party => party.id == update.party ) || DefaultParty );
                });
                if(partyProgression.length > 1) popup.appendChild( PartyProgressionBlocs.render({ parties: partyProgression }) );

                // Update notes
                const updateNotes = regionUpdates.filter(update => update.note);
                if(updateNotes.length === 1) popup.appendChild( new Elt({ tag: 'p', innerHTML: updateNotes[0].note }) );
                else if(updateNotes.length > 1) popup.appendChild( new Elt({
                    tag: 'ul',
                    children: updateNotes.map( update => {
                        return new Elt({ tag: 'li', innerHTML: update.note });
                    })
                }));
            }
            else{ // attributes note; assume changes explained in showChanges updates otherwise
                const note = regionAttributes.find( attr => attr.label == "map_note" );
                if(note) popup.append( new Elt({ tag: 'p', innerHTML: note.value }) );
            }

            const counted = regionAttributes.find( attr => attr.label == "counted");
            if(counted && parseFloat(counted.value) > 0){
                let value;
                if(counted.value >= 100) value = "Estimated >99% counted";
                else value = `Estimated ${counted.value}% counted`;
                popup.append( new Elt({ tag: 'p', innerHTML: value }) );
            }

            // Additional content
            const additionalContent = this.mapHoverFunComponents.additionalContent(id, regionResults, latestResultsUpdate, this.data.election);
            if(additionalContent) popup.append(...additionalContent);
        };

        data = { hoverFun: hoverFun, ...data };
        this.currentFillData = data;
        this.visibleMap.fill(data);
    }

    hydrate(elt){
        // Toggle messages
        const messagesContainer = elt.querySelector('.ElectionResultContainer__messages-container');
        const toggleMessagesButton = elt.querySelector('.ElectionResultContainer__messages-button');
        if(messagesContainer && toggleMessagesButton){
            toggleMessagesButton.addEventListener('click', () => {
                messagesContainer.classList.toggle('visible');
            });
        }

        return {
            container: elt,
            hoverPopup: elt.querySelector('.hover-popup'),
            messages: {
                container: messagesContainer,
                innerContainer: messagesContainer?.querySelector('.ElectionResultContainer__messages-inner-container'),
                toggleButton: toggleMessagesButton,
            },
            summary: {
                container: elt.querySelector('.ElectionResultContainer__summary-container'),
            },
            maps: {
                container: elt.querySelector('.ElectionResultContainer__map-container'),
                types: [...elt.querySelectorAll('.ElectionResultContainer__map-container > div')]
            }
        }
    }

    async downloadData({ election, regionsType = null, messageGroup, showChanges }){
    
        if(
            CachedData.regions.length === 0 || 
            (regionsType != null && CachedData.regions.filter( region => region.type == regionsType ).length == 0)
        ) await CachedData.fetchRegions(regionsType);

        if(CachedData.attributes.length === 0) await CachedData.fetchAttributes();
        if(CachedData.parties.length === 0) await CachedData.fetchParties();
        if(!CachedData.results[election]) await CachedData.fetchResults(election);

        if(showChanges && !CachedData._updates[election]) await CachedData.fetchUpdates(election);

        if(messageGroup && !CachedData.messages[messageGroup]) await CachedData.fetchMessages(messageGroup);
    }

    winFormula(results){
        switch(this.winFormulaName){
            case "second-place": { // parties in second place
                const regionResults = [];
                results.forEach(result => {
                    if(!(result.id in regionResults)){
                        regionResults[result.id] = { largest: result, secondLargest: {votes: -Infinity}, count: 1 }
                    }
                    else{
                        if(result.votes > regionResults[result.id].largest.votes){
                            regionResults[result.id].secondLargest = regionResults[result.id].largest;
                            regionResults[result.id].largest = result;
                        }
                        else if(result.votes > regionResults[result.id].secondLargest.votes){
                            regionResults[result.id].secondLargest = result;
                        }
                        regionResults[result.id].count++;
                    }
                });
                return regionResults.filter( regionResult => regionResult.count > 1).map( regionResult => regionResult.secondLargest );
            }

            default: // any elected
                const winners = results.filter( result => result.candidates.some( candidate => candidate.elected ) );
                winners.forEach( result => result.candidates = result.candidates.filter( candidate => candidate.elected ) );
                return winners;
        }
    }

    regionSelector(id, regionCount = null){
        if(!regionCount) return `[name="${id}"]`;
        else return `[name="${id}"] > *:nth-child(${regionCount})`;
    }

    createSummaries({ preferCandidateNames = false } = {}){
        const summaries = []; // {candidate: string, party : Party, count : number}[]
                
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
            const regionUpdates = this.data.showChanges ? CachedData.updates[this.data.election].filter( update => update.id == result.id ) : [];

            let winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;
            let party = CachedData.parties.find( p => p.id === winner) || DefaultParty;

            if("linked_to" in party && "link_type" in party && party.link_type == 0){
                party = CachedData.parties.find( p => p.id === party.linked_to ) || party;
                winner = party.id;
            }

            if(!summaries.find( summary => summary.party.id == winner)){
                summaries.push({
                    candidate: preferCandidateNames ? result.candidates[0].name : party.displayId,
                    party: party,
                    count: result.candidates[0].elected
                });
            }
            else summaries.find( summary => summary.party.id == winner ).count += result.candidates[0].elected;
        });

        summaries.sort( (a,b) => {
            const getCount = (x) => {
                return (["VACANT","SPEAKER","IND"].includes(x.party.id.toUpperCase())) ? -Infinity : x.count;
            }
            return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
        } );

        return summaries;
    }

    addSummary(){
        const summaries = this.createSummaries();
        this.structure.summary.container.appendChild( 
            ElectionSummaryBlocs.render({ data: summaries, rowLength: 5 })
        );
    }

    updateMap(showChanges = false){
        const newFills = []; // {id: string, color: string, opacity?: number}[]

        const regionCounts = {};
        let anyMultipleWinners = false;
        const winners = this.winFormula(CachedData.results[this.data.election]);
        winners.forEach( result => {
            if(!regionCounts[result.id]) regionCounts[result.id] = {
                total: result.candidates?.length ?? 1,
                partyCounts: { [result.party]: 1 }
            };
            else{
                anyMultipleWinners = true;
                regionCounts[result.id].total += result.candidates?.length ?? 1;
                regionCounts[result.id].partyCounts[result.party] = (regionCounts[result.id].partyCounts[result.party] ?? 0) + 1;
            }
        });

        // Order by number of elected candidates for visual L->R on the map
        if(anyMultipleWinners) winners.sort( (a,b) => {
            if(a.id != b.id) return 0;

            const candidateCountDifference = b.candidates.length - a.candidates.length;
            if(candidateCountDifference !== 0) return candidateCountDifference;

            const partyCount = (x) => regionCounts[x.id].partyCounts[x.party] || 0;
            const partyCountDifference = partyCount(b) - partyCount(a);
            if(partyCountDifference !== 0) return partyCountDifference;

            return a.party.localeCompare(b.party);
        });
        
        winners.forEach( result => {
            for(let i = 0; i < (result.candidates?.length ?? 1); i++){
                regionCounts[result.id].current = (regionCounts[result.id].current || 0) + 1;
                const selector = regionCounts[result.id].total === 1 ? null : regionCounts[result.id].current;

                const regionUpdates = CachedData.updates[this.data.election].filter( u => u.id == result.id );
                if(this.data.showChanges && regionUpdates.length > 0){
                    const latestUpdate = regionUpdates[regionUpdates.length - 1];
                    const party = CachedData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                    if(party) newFills.push({
                        id: latestUpdate.id, 
                        selector: this.regionSelector(latestUpdate.id, selector),
                        color: party.color || "var(--default-color)" 
                    });
                }
                else{
                    const party = CachedData.parties.find( p => p.id == result.party ) || DefaultParty;
                    if(party) newFills.push({ 
                        id: result.id, 
                        selector: this.regionSelector(result.id, selector),
                        color: party.color || "var(--default-color)", 
                        opacity: showChanges ? 0.2 : undefined 
                    });
                }
            };
        });
        
        this.fillMap({ regions: CachedData.regions, fills: newFills });
    }

    addMessages({
        dateFun,
        hideTime = this.data.showChanges,
        timezoneArgs = {},
        urlFun = (slug, type) => "#",
        childrenFun
    }){ 

        if(!dateFun) dateFun = (date) => {
            const formatter = Intl.DateTimeFormat(timezoneArgs.locale || "en-GB", {
                timeZone: timezoneArgs.timeZone ? timezoneArgs.timeZone : "UTC",
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: !hideTime ? "2-digit" : undefined,
                minute: !hideTime ? "2-digit" : undefined,
                hour12: false,
                timeZoneName: "short"
            });
            const parts = formatter.formatToParts(date);
            const part = (key) => parts.find(p => p.type === key).value;

            let dateString = part("weekday");

            let ordinalIndicator = "th";
            if(![11,12,13].includes(part("day"))) switch(part("day") % 10){
                case 1: ordinalIndicator = "st"; break;
                case 2: ordinalIndicator = "nd"; break;
                case 3: ordinalIndicator = "rd";
            }

            dateString += ` ${part("day")}${ordinalIndicator} ${part("month")}`;

            if(date.getFullYear() !== (new Date()).getFullYear()) dateString += ` ${part("year")}`;

            if(!hideTime) dateString += `, ${part("hour")}:${part("minute")} <span class="Message__timezone">${part("timeZoneName")}</span>`;

            return dateString;
        };
        
        const injectLinks = (text) => {
            const spans = [];
            let currentUl = false;
            let currentLi = false;
            text.split(/\n/g).forEach( line => {
                if(line.startsWith("- ")){
                    if(!currentUl) currentUl = new Elt({ tag: 'ul' });
                    currentLi = new Elt({ tag: 'li' });
                    line = line.replace(/^- /, "");
                }
                else if(currentUl){
                    spans.push(currentUl);
                    currentUl = false;
                    currentLi = false;
                }

                line.split("#").forEach( (link, index) => {
                    if(link == "") return;
            
                    if(index % 2){
                        let [_, type, slug, displayText] = ["", "", link, link]; 
                        if(link.includes("@")) [_ = "", type = "", slug = "", displayText = ""] = link.split("@");
    
                        const span = new Elt({
                            tag: 'a',
                            classList: ["interactive"],
                            href: urlFun(slug, type),
                            innerHTML: displayText
                        });
                        if(currentLi) currentLi.appendChild(span);
                        else spans.push(span);
                    }
                    else{
                        const span = new Elt({ tag: 'span', innerHTML: link }) ;
                        if(currentLi) currentLi.appendChild(span);
                        else spans.push(span);
                    }
                });

                if(currentLi) currentUl.appendChild(currentLi);
            });
            if(currentUl) spans.push(currentUl);
            return spans;
        }

        CachedData.messages[this.data.messageGroup].forEach(message => {
            const square = message.square ? (CachedData.parties.find(p => p.id == message.square) || DefaultParty) : null;
            const oldSquare = message.old_square ? (CachedData.parties.find(p => p.id == message.old_square) || DefaultParty) : null;

            const children = childrenFun ? [...injectLinks(message.text), ...childrenFun(message)] : injectLinks(message.text);

            this.structure.messages.innerContainer.appendChild( Message.render({
                date: dateFun(message.date),
                noHeader: message.no_header,
                oldSquare: oldSquare,
                square: square,
                children: children
            }) );
        });
        this.structure.messages.container.classList.remove('loading');
    }
}
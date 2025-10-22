import Message from "components/shared/Message/Message";

class ElectionResultContainer{

    static observer;
    static elementMaps = new WeakMap();

    constructor(elt, MapClass){
        this.structure = this.hydrate(elt);
        this.winFormulaName = this.structure.container.getAttribute('data-win-formula');

        this.data = {
            election: this.structure.container.getAttribute('data-election'),
            regionsType: this.structure.container.getAttribute('data-regions-type'),
            updates: [],
        };
        this.attributes = {
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
                        await instance.downloadData(instance.data, instance.attributes);
                        instance.addSummary();
                        instance.updateMap();
                        if(CachedData.messages[instance.attributes.messageGroup]) instance.addMessages();
                    }
                }
            });
        });
        
        this.constructor.observer.observe(this.structure.container);
    }

    get visibleMap(){
        return this.maps.find(map => map.visible) || this.maps[0];
    }
    fillMap(data){
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
            hoverPopup: elt.querySelector('.ElectionResultContainer__hover-popup'),
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

    async downloadData({ election, regionsType = null }, { messageGroup, showChanges }){

        if(CachedData.parties.length === 0) await CachedData.fetchParties();
        if(CachedData.regions.length === 0) await CachedData.fetchRegions(regionsType);
        if(!CachedData.results[election]) await CachedData.fetchResults(election);

        if(showChanges){
            this.data.updates = await fetch(Endpoint + "/updates/uk/" + election)
                .then( res => res.text() )
                .then( res => parseJSONWithDates(res, "date") );
            this.data.updates.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
        }

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

    regionSelector(id, regionCount = NULL){
        if(!regionCount) return `[name="${id}"]`;
        else return `[name="${id}"] > *:nth-child(${regionCount})`;
    }

    addSummary(){}

    updateMap(showChanges = false){
        const newFills = []; // {id: string, color: string, opacity?: number}[]
        
        // Order by number of elected candidates (this is just for an approximate visual L->R on the map and has no real importance)
        // CachedData.results[this.data.election].sort( (a,b) => {
        //     const electedCount = (x) => {
        //         return CachedData.results[this.data.election]
        //             .filter(r => {
        //                 return r.id == x.id && r.party == x.party;
        //             })
        //             .map(r => {
        //                 return r.candidates.reduce( (count, candidate) => {
        //                     return count + candidate.elected;
        //                 }, 0 );
        //             })
        //             .reduce( (sum, count) => sum + count, 0 );
        //     }
        //     const votes = (x) => {
        //         return CachedData.results[this.data.election]
        //             .filter(r => r.id == x.id && r.party == x.party)
        //             .map(r => r.votes)
        //             .reduce( (sum, count) => sum + count, 0 );
        //     }

        //     const electedCounts = {a: electedCount(a), b: electedCount(b)};
        //     return electedCounts.b != electedCounts.a ? electedCounts.b - electedCounts.a : votes(b) - votes(a);
        // });

        const regionCounts = {};
        const winners = this.winFormula(CachedData.results[this.data.election]);
        winners.forEach( result => {
            if(!regionCounts[result.id]) regionCounts[result.id] = {total: result.candidates?.length ?? 1};
            else regionCounts[result.id].total += result.candidates?.length ?? 1;
        });
        winners.forEach( result => {
            for(let i = 0; i < (result.candidates?.length ?? 1); i++){
                regionCounts[result.id].current = (regionCounts[result.id].current || 0) + 1;
                const selector = regionCounts[result.id].total === 1 ? null : regionCounts[result.id].current;

                const regionUpdates = this.data.updates.filter( u => u.id == result.id );
                if(regionUpdates.length > 0){
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
        timezoneArgs = {},
        urlFun = (slug, type) => "#",
        childrenFun
    }){ 

        if(!dateFun) dateFun = (date) => {
            if(timezoneArgs.localeStringArgs) date = new Date(date.toLocaleString(...timezoneArgs.localeStringArgs));
            let time = date.getHours().toString().padStart(2,'0') + ":" + date.getMinutes().toString().padStart(2,'0');
            const dayWord = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()];
            let dateString = dayWord + " " + dateToLongDate(date) + ", " + time;

            if(timezoneArgs.localeLabel) dateString += ` <span style="font-size:0.8em">${timezoneArgs.localeLabel}</span>`;

            return dateString;
        };
        
        const injectLinks = (text) => {
            const spans = [];
            text.split("#").forEach( (link, index) => {
                if(link == "") return;
        
                if(index % 2){
                    let [_, type, slug, displayText] = ["", "", link, link]; 
                    if(link.includes("@")) [_ = "", type = "", slug = "", displayText = ""] = link.split("@");
  
                    const span = new Elt({
                        tag: 'a',
                        classList: ["interactive", "unstyled"],
                        href: urlFun(slug, type),
                        innerHTML: displayText
                    });
                    spans.push(span);
                }
                else spans.push( new Elt({ tag: 'span', innerHTML: link }) );
            });
            return spans;
        }

        CachedData.messages[this.attributes.messageGroup].forEach(message => {
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
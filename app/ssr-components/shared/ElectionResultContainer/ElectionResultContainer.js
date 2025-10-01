class ElectionResultContainer{

    static observer;
    static elementMaps = new WeakMap();

    constructor(elt, MapClass){
        this.structure = this.hydrate(elt);
        this.data = {
            election: this.structure.container.getAttribute('data-election'),
            updates: [],
            results: []
        };

        Toggle.register('map-type', (bool) => {
            const map = this.maps.find(map => 
                map.type === (bool ? "geographic" : "cartographic")
            );
            if(map) map.show();
        });

        this.maps = (this.structure.maps.types).map(container => {
            const instance = new MapClass(container, this, { election: this.data.election, type: container.getAttribute('data-type'), src: container.getAttribute('data-src') });
            // clean up HTML
            container.removeAttribute('data-type');
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
                        instance.updateMap();
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

    async downloadData({ election, showChanges = false }){

        if(CachedData.parties.length === 0){
            if(!CachedData.partiesPromise){
                CachedData.partiesPromise = fetch(Endpoint + "/parties/uk").then( async res => {
                    const data = await res.json();
                    delete CachedData.partiesPromise;
                    return data;
                });
            }
            const partyData = await CachedData.partiesPromise;
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            CachedData.parties = partyData;
        }
        if(CachedData.regions.length === 0){
            if(!CachedData.regionsPromise){
                CachedData.regionsPromise = fetch(Endpoint + "/regions/uk").then( async res => {
                    const data = await res.json();
                    return data;
                });
            }
            const regionsData = await CachedData.regionsPromise;
            CachedData.regions = regionsData;
        }

        if(showChanges){
            this.data.updates = await fetch(Endpoint + "/updates/uk/" + election)
                .then( res => res.text() )
                .then( res => parseJSONWithDates(res, "date") );
            this.data.updates.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
        }

        this.data.results =  await fetch(Endpoint + '/results/uk/' + election).then( res => res.json() );
        CachedData.results[election] = this.data.results;
    }

    winFormula(results){
        return results.filter(result => result.elected);
    }

    addSummary(){
        this.structure.summary.container.innerHTML = "summary inner";
    }

    updateMap(showChanges = false){
        const newFills = []; // {id: string, color: string, opacity?: number}[]
        this.winFormula(this.data.results).forEach( result => {
            const regionUpdates = this.data.updates.filter( u => u.id == result.id );
            if(regionUpdates.length > 0){
                const latestUpdate = regionUpdates[regionUpdates.length - 1];
                const party = CachedData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                if(party) newFills.push({ id: latestUpdate.id, color: party.color || "var(--default-color)" });
            }
            else{
                const party = CachedData.parties.find( p => p.id == result.party ) || DefaultParty;
                if(party) newFills.push({ 
                    id: result.id, 
                    color: party.color || "var(--default-color)", 
                    opacity: showChanges ? 0.2 : undefined 
                });
            }
        });
        
        this.fillMap({ regions: CachedData.regions, fills: newFills });
    }

    /*const getResults = async () => {
            updateData

            resultData

            fills

            if(messageGroup){
                const newMessages = await getMessages(parties, latestMessageDate, '/messages/uk/' + messageGroup, regionUrlFun, timeFun);
                setMessages(newMessages);
            }
        };*/
}
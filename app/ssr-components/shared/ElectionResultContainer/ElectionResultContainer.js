import Message from "components/shared/Message/Message";

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
        this.attributes = {
            messageGroup: this.structure.messages.container?.getAttribute('data-group'),
            showChanges: this.structure.container.getAttribute('data-show-changes')
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

    async downloadData({ election }, { messageGroup, showChanges }){

        if(CachedData.parties.length === 0) await CachedData.fetchParties();
        if(CachedData.regions.length === 0) await CachedData.fetchRegions();
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
        return results.filter(result => result.elected);
    }

    addSummary(){}

updateMap(showChanges = false){
        const newFills = []; // {id: string, color: string, opacity?: number}[]
        this.winFormula(CachedData.results[this.data.election]).forEach( result => {
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

    addMessages({
        dateFun = (date) => date, 
        urlFun = (slug, type) => "#",
        childrenFun
    }){ 
        
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
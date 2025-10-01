const Endpoint = "/api";
class CachedData{
    constructor(){}
    static _results = {};
    static get results(){
        return this._results;
    }
    
    static parties = [];
    static regions = [];
};
const parseJSONWithDates = (text, keys) => {
    if(typeof keys === "string") keys = [keys];
    return JSON.parse(text, (key, value) => {
        if(keys.includes(key)) return new Date(value);
        return value;
    });
}
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
window.addEventListener('DOMContentLoaded', () => {
    for(const item of document.getElementsByClassName('HeroNav__item')){
        const section = document.getElementById(item.getAttribute('data-id'));
        if(section) item.addEventListener('click', () => {
            section.scrollIntoView({behavior: "smooth"});
        });
    }
});
class Map{
    static instances = [];
    
    constructor(container, containerInstance){
        Map.instances.push(this);
        this.structure = {container: container};
        this.containerInstance = containerInstance;
        this.downloaded = this.structure.container.innerHTML !== "";
        this.downloadParameters = {};
        if(!this.downloaded){
            this.downloadParameters.src = this.structure.container.getAttribute('data-src');
        }
    }
    get visible(){ return this.structure.container.checkVisibility() }
    fill({
        regions,                                    // list of regions to loop through
                                                    // Region[]
        regionSelector = (id) => `[name="${id}"]`,  // querySelector for regions on map; defaults to name attribute
                                                    // (any, ...) => string
        fills = [],                                 // list of fills to apply to given region ids
                                                    // ?{id : string, color : string, opacity? : number}[]
        hoverFun = (active,event,id) => {},         // optional function to execute on hover of regions
                                                    // ?(active?: boolean, event?: React.MouseEvent, id?: string) => void
        clickFun = (id) => {}                       // optional function to execute on click of regions
                                                    // ?(id?: string) => void
    }){
        this.currentFill = this.containerInstance.currentFillData;
        regions.map( region => {
            let fill = fills.find(f => f.id == region.id);
            if(!fill) fill = {id: region.id, color: "transparent"};
            const regionElt = this.structure.container.querySelector( regionSelector(region.id) );
            if(!regionElt) return;
            regionElt.setAttribute('fill', fill.color);
            regionElt.setAttribute('style', fill.opacity !== undefined ? "opacity:" + fill.opacity : "");
            regionElt.addEventListener('mousemove', (event) => {
                hoverFun(true, event, region.id);
            });
            regionElt.addEventListener('mouseout', () => {
                hoverFun(false);
            });
            regionElt.addEventListener('click', () => {
                clickFun(region.id);
            });
        });
    }
    async show(){
        this.containerInstance.maps.forEach(map => { if(map !== this) map.hide() });
        
        if(!this.downloaded) await this.download();
        this.structure.container.classList.remove('hidden');
        // If fill data has changed, refill
        if(this.containerInstance.currentFillData && this.currentFill != this.containerInstance.currentFillData){
            this.fill(this.containerInstance.currentFillData);
        }
    }
    hide(){
        this.structure.container.classList.add('hidden');
    }
    async download(){
        this.downloaded = true;
        await fetch('/' + this.downloadParameters.src).then( response => response.text() ).then( svgText => {
            this.structure.container.innerHTML = svgText;
        });
        if(this.containerInstance.currentFillData){
            this.fill(this.containerInstance.currentFillData);
        }
    }
}
class Toggle{
    static register(id, fun){
        const elts = document.querySelectorAll('.Toggle[data-id="' + id + '"]');
        for(const elt of elts){
            let state = false;
            const inner = elt.querySelector('.Toggle__inner');
            const outer = elt.querySelector('.Toggle__outer');
            if(inner && outer) outer.addEventListener('click', () => {
                state = !state;
                inner.classList.toggle('Toggle__toggled');
                fun(state);
            });
            const off = elt.querySelector('.Toggle__off');
            if(off) off.addEventListener('click', () => {
                inner.classList.remove('Toggle__toggled');
                fun(false);
            });
            const on = elt.querySelector('.Toggle__on');
            if(on) on.addEventListener('click', () => {
                inner.classList.add('Toggle__toggled');
                fun(true);
            });
            
        }
    }
}

const partyIdToDisplayId = (partyId) => {
    let displayId = partyId.toUpperCase();
    if(["speaker","vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
    else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);
    return displayId;
}
import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        instances.push(
            new UKElectionResultContainer(elt)
        );
    }
});
class UKElectionResultContainer extends ElectionResultContainer{
    constructor(elt){
        super(elt, UKGeneral);
    }
    addSummary(){
        const summaries = []; // {party : Party, count : number}[]
        this.winFormula(this.data.results).forEach( result => {
            
            const regionUpdates = this.data.updates.filter( u => u.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;
            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === result.party) || DefaultParty;
                summaries.push({ party: party, count: 1 });
            }
            else summaries.find( summary => summary.party.id == winner ).count++;
        });
        summaries.sort( (a,b) => {
            const getCount = (x) => {
                return (["vacant","speaker","ind"].includes(x.party.id)) ? -Infinity : x.count;
            }
            return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
            } );
        
        this.structure.summary.container.appendChild( 
            ElectionSummaryBlocs.render({ data: summaries, rowLength: 5 })
        );
    }
}
class UKGeneral extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance);
        this.election = election;
        this.type = type;
    }
    async download(){
        await (super.download.bind(this))();
        if(this.type === "geographic"){
            const attribution = this.structure.container.appendChild( document.createElement('p') );
            attribution.classList.add('Map__attribution');
            switch(this.src){
                case "public/maps/UK-2024-geographic.svg":
                    attribution.innerHTML = 'Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:UK_House_of_Commons_constituencies_2023.svg">File:UK House of Commons constituencies 2023.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license. Contains public sector information licensed under the <a target="_blank" href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0.</a>';
                    break;
                case "public/maps/UK-2010-geographic.svg":
                    attribution.innerHTML = 'Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:2017UKElectionMap.svg">File:2017UKElectionMap.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license.';
                    break;
            }
        }
    }
}

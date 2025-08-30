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
    constructor(elt){
        this.structure = this.hydrate(elt);
        this.data = {
            election: this.structure.container.getAttribute('data-election'),
        };
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
                    }
                }
            });
        });
        
        this.constructor.observer.observe(this.structure.container);
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
    addSummary(){
        this.structure.summary.container.innerHTML = "summary inner";
    }
    /*const getResults = async () => {
            updateData
            resultData
            const newFills : {id: string, color: string, opacity?: number}[] = [];
            winFormula(resultData).forEach( result => {
                const regionUpdates = updateData.filter( u => u.id == result.id );
                if(regionUpdates.length > 0){
                    const latestUpdate = regionUpdates[regionUpdates.length - 1];
                    const party : Party = parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                    if(party) newFills.push({ id: latestUpdate.id, color: party.color || "var(--default-color)" });
                }
                else{
                    const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
                    if(party) newFills.push({ 
                        id: result.id, 
                        color: party.color || "var(--default-color)", 
                        opacity: changes ? 0.2 : undefined 
                    });
                }
            });
            setFills(newFills);
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
        super(elt);
    }
    addSummary(){
        const winFormula = (results) => results.filter(result => result.elected);
        const summaries = []; // {party : Party, count : number}[]
        winFormula(this.data.results).forEach( result => {
            
            // const regionUpdates = updates.filter( u => u.id == result.id );
            // const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;
            const winner = result.party;
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

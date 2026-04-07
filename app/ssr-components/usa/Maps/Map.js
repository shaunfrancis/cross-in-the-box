import HoverPopup from 'components/shared/HoverPopup/HoverPopup';

class USAPresidential extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }
}

class USASenate extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }

    async show(){
        this.containerInstance.maps.forEach(map => { if(map !== this) map.hide() });
        
        if(!this.downloaded) await this.download();
        this.structure.container.classList.remove('hidden');

        // switching between Senate maps *always* requires new fill data to be created
        if(this.containerInstance.currentFillData) this.containerInstance.updateMap();
    }

    fill({
        regions,                                    // list of regions to loop through
                                                    // Region[]

        fills = [],                                 // list of fills to apply to given region ids
                                                    // ?{id : string, color : string, opacity? : number}[]

        hoverFun = (active, popup, id) => {},       // optional function to execute on hover of regions
                                                    // ?(active : boolean, popup : HTMLDivElement, id?: string) => void

        clickFun = (event, id) => {},               // optional function to execute on click of regions
                                                    // ?(id?: string) => void

        loadFun = (mapContainer, electionResultContainer) => {}                 
                                                    // option function to execute once every time fill() is called
                                                    // ?(mapContainer: HTMLElement, electionResultContainer: HTMLElement) => void
    }){
        if(this.type === "cartographic") return super.fill({regions, fills, hoverFun, clickFun, loadFun});

        if(this.eventController) this.eventController.abort();
        this.eventController = new AbortController();
        
        this.currentFill = this.containerInstance.currentFillData;

        loadFun(this.structure.container, this.containerInstance.structure.container);

        const classlessRegionIds = [...new Set(regions.map( region => region.id.substring(0, region.id.length - 1 ) ))];

        classlessRegionIds.map( id => {
            let regionFills = fills.filter(f => f.id.substring(0, f.id.length - 1) == id);
            if(regionFills.length === 0){
                regionFills = [
                    {id: id, selector: `path[name="${id}"]`, color: "var(--light-default-color)"}
                ];
            }
            
            // there could be multiple fills for the same classless id if both senate seats were up for election in the same cycle
            // but these should have the same selector, opacity, and color (stripe gradients generated before this in fillMap)
            const regionElts = this.structure.container.querySelectorAll(regionFills[0].selector);
            if(regionElts.length === 0) return;

            regionElts.forEach(regionElt => {
                regionElt.setAttribute('fill', regionFills[0].color);
                if(regionFills[0].opacity !== undefined) regionElt.setAttribute('fill-opacity', regionFills[0].opacity);

                HoverPopup.attach({
                    container: this.containerInstance.structure.hoverPopup,
                    trigger: regionElt,
                    signal: this.eventController.signal,
                    content: (popup) => {
                        if(regionFills.length === 1) hoverFun(true, popup, regionFills[0].id);
                        else{
                            popup.innerHTML = "";
                            regionFills.forEach( (fill, index) => {
                                const container = popup.appendChild( document.createElement('div') );
                                if(index > 0) container.style.marginTop = "20px";
                                hoverFun(true, container, fill.id);
                            });
                        }
                    }
                });

                regionElt.addEventListener('click', event => {
                    clickFun(event, regionFills[0].id); // if there are two elections then clickFun just directs to first one
                }, { signal: this.eventController.signal });
            });
        });
    }
}

class USAHouse extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }

    async init(){
        const map = this.structure.container.querySelector('svg');

        // mid-decade redistricting should use same cartographic map with name attributes swapped out onload
        const replaces = [];
        switch(this.election){
            case "H2024":
                replaces.push({state: "AL", from: "2022", to: "2024"});
                replaces.push({state: "GA", from: "2022", to: "2024"});
                replaces.push({state: "LA", from: "2022", to: "2024"});
                replaces.push({state: "NC", from: "2022", to: "2024"});
                replaces.push({state: "NY", from: "2022", to: "2024"});
                break;

            case "H2020":
                replaces.push({state: "NC", from: "2012", to: "2020"});
            case "H2018":
                replaces.push({state: "PA", from: "2012", to: "2018"});
            case "H2016":
                replaces.push({state: "FL", from: "2012", to: "2016"});
                replaces.push({state: "VA", from: "2012", to: "2016"});
                this.election != "H2020" && replaces.push({state: "NC", from: "2012", to: "2016"});
                break;
        }

        replaces.forEach( replace => {
            map.querySelectorAll('[name^="' + replace.from + replace.state + '"]').forEach( path => {
                const district = path.getAttribute('name').substring(6, 8);
                path.setAttribute('name', replace.to + replace.state + district);
            });
        } );
    }
}

class USAGubernatorial extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }
}
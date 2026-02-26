class Map{
    static instances = [];
    
    constructor(container, containerInstance, {election, type, src}){
        Map.instances.push(this);
        this.structure = {container: container};
        this.containerInstance = containerInstance;

        this.election = election;
        this.type = type;
        this.src = src;

        this.downloaded = this.structure.container.innerHTML !== "";
        this.downloadParameters = {};
        if(!this.downloaded){
            this.downloadParameters.src = this.structure.container.getAttribute('data-src');
        }
        else this.init();
    }

    init(){} // optional method to run on construction (if downloaded) or immediately following downloading

    get visible(){ return this.structure.container.checkVisibility() && !this.structure.container.classList.contains('hidden') }

    fill({
        regions,                                    // list of regions to loop through
                                                    // Region[]

        fills = [],                                 // list of fills to apply to given region ids
                                                    // ?{id : string, color : string, opacity? : number}[]

        hoverFun = (active, popup, id) => {},       // optional function to execute on hover of regions
                                                    // ?(active : boolean, popup : HTMLDivElement, id?: string) => void

        clickFun = (id) => {},                      // optional function to execute on click of regions
                                                    // ?(id?: string) => void

        loadFun = (mapContainer, electionResultContainer) => {}                 
                                                    // option function to execute once every time fill() is called
                                                    // ?(mapContainer: HTMLElement, electionResultContainer: HTMLElement) => void
    }){
        if(this.eventController) this.eventController.abort();
        this.eventController = new AbortController();

        this.currentFill = this.containerInstance.currentFillData;

        loadFun(this.structure.container, this.containerInstance.structure.container);

        regions.map( region => {
            let regionFills = fills.filter(f => f.id == region.id);
            if(regionFills.length === 0) regionFills = [{id: region.id, selector: `[name="${region.id}"]`, color: "#EEE"}];

            regionFills.forEach( fill => {

                const regionElts = this.structure.container.querySelectorAll(fill.selector);
                if(regionElts.length === 0) return;

                regionElts.forEach(regionElt => {
                    regionElt.setAttribute('fill', fill.color);
                    if(fill.opacity !== undefined) regionElt.setAttribute('fill-opacity', fill.opacity);
                    
                    regionElt.addEventListener('mouseover', (_) => {
                        const popup = this.containerInstance.structure.hoverPopup;
                        hoverFun(true, popup, region.id);
                    }, { signal: this.eventController.signal });

                    regionElt.addEventListener('mousemove', (event) => {
                        const popup = this.containerInstance.structure.hoverPopup;
                        const coordinates = [event.clientX, event.clientY];
                        const width = popup.offsetWidth;
                        const height = popup.offsetHeight;

                        const offsets = [0,0];
                        if(coordinates[0] + 20 + width > window.innerWidth) offsets[0] = -(width + 40);
                        if(coordinates[1] + 20 + height > window.innerHeight) offsets[1] = window.innerHeight - height - 20 - coordinates[1];

                        popup.style.left = coordinates[0] + offsets[0] + 20 + "px";
                        popup.style.top = coordinates[1] + offsets[1] + 20 + "px";
                        popup.classList.remove('hidden');
                    }, { signal: this.eventController.signal });

                    regionElt.addEventListener('mouseout', () => {
                        const popup = this.containerInstance.structure.hoverPopup;
                        popup.classList.add('hidden');
                        hoverFun(false, popup);
                    }, { signal: this.eventController.signal });

                    regionElt.removeEventListener('click', this.click);
                    regionElt.addEventListener('click', () => {
                        clickFun(region.id);
                    }, { signal: this.eventController.signal });
                });
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
        this.init();
        if(this.containerInstance.currentFillData){
            this.fill(this.containerInstance.currentFillData);
        }
    }
}
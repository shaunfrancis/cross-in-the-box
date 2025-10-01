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
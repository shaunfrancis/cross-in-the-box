class UKGeneral extends Map{
    constructor(elt){
        super(elt);
    }

    fill(
        regions,                            // Region[]
        fills = [],                         // ?{id : string, color : string, opacity? : number}[]
        hoverFun = (active,event,id) => {}, // ?(active?: boolean, event?: React.MouseEvent, id?: string) => void
        clickFun = (id) => {}               // ?(id?: string) => void
    ){

        regions.map( region => {
            let fill = fills.find(f => f.id == region.id);
            if(!fill){
                // if(UKSeatsToWatch.find( s => s.id == region.id)) fill = {id: region.id, color: "url(#highlight_no_result)"};
                // else fill = {id: region.id, color: "url(#no_result)"};
                fill = {id: region.id, color: "transparent"};
            }

            const square = this.structure.container.querySelector('rect[name="' + region.id + '"]');
            if(!square) return;

            square.setAttribute('fill', fill.color);
            square.setAttribute('style', fill.opacity !== undefined ? "opacity:" + fill.opacity : "");

            square.addEventListener('mousemove', (event) => {
                hoverFun(true, event, region.id);
            });
            square.addEventListener('mouseout', () => {
                hoverFun(false);
            });
            square.addEventListener('click', () => {
                clickFun(region.id);
            });
        });
    }
}
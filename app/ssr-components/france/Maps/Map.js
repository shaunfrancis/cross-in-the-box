class FrancePresidential extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }

    async download(){
        await (super.download.bind(this))();

        if(this.type === "geographic"){
            const attribution = this.structure.container.appendChild( document.createElement('p') );
            attribution.classList.add('Map__attribution');

            switch(this.src){
                case "public/maps/France-1985-geographic.svg":
                    attribution.innerHTML = 'Adapted from <a target="_blank" href="#">File:</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license.';
                    break;
            }
        }
    }
}
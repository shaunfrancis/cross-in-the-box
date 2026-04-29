class NZGeneral extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }

    async download(){
        await (super.download.bind(this))();

        if(this.type === "geographic"){
            const attribution = this.structure.container.appendChild( document.createElement('p') );
            attribution.classList.add('Map__attribution');

            switch(this.src){
                case "public/maps/NZ-2020-geographic.svg": case "public/maps/NZ-2014-geographic.svg":
                    attribution.innerHTML = 'Adapted from <a href="https://commons.wikimedia.org/wiki/File:2023_New_Zealand_general_election.svg">File:2023 New Zealand general election.svg</a>. Licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license.';
                    break;
            }
        }
    }
}
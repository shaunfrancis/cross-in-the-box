class CanadaFederal extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }

    async download(){
        await (super.download.bind(this))();

        if(this.type === "geographic"){
            const attribution = this.structure.container.appendChild( document.createElement('p') );
            attribution.classList.add('Map__attribution');

            switch(this.src){
                case "public/maps/Canada-2025-geographic.svg":
                    attribution.innerHTML = 'Adapted from <a href="https://commons.wikimedia.org/wiki/File:Canada_Election_2025_Results_Map.svg">File:Canada Election 2025 Results Map.svg</a>. Licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license. Contains data from the 2022 Federal Redistribution Commissions, Statistics Canada and OpenStreetMap and its contributors.';
                    break;
                case "public/maps/Canada-2015-geographic.svg":
                    attribution.innerHTML = 'Adapted from <a href="https://commons.wikimedia.org/wiki/File:Canada_Election_2021_Results_Map.svg">File:Canada Election 2021 Results Map.svg</a>. Licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license. Contains data from Statistics Canada and OpenStreetMap and its contributors.';
                    break;
            }
        }
    }
}
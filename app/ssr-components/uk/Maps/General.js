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
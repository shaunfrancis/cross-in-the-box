window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        switch(elt.getAttribute('data-regions-type')){
            case "scotland":
                instances.push(new UKScotlandElectionResultContainer(elt));
                break;
            case "wales":
                instances.push(new UKWalesElectionResultContainer(elt));
                break;
            case "general": default: 
                instances.push(new UKGeneralElectionResultContainer(elt));
        }
    }
});

class UKElectionResultContainer extends ElectionResultContainer{
    addMessages(options){
        const urlFun = (slug, type) => {
            let url = "/uk/";
            switch(type){
                case "scottish-parliament": url += "scottish-parliament/"; break;
                case "senedd-cymru": url += "senedd-cymru/"; break;
                case "general": default: url += "general-elections/"
            }
            url += 'constituency/' + regionToSlug(slug);
            return url;
        }

        super.addMessages({ urlFun: urlFun, ...options });
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        switch(elt.getAttribute('data-regions-type')){
            case "presidential": default: 
                instances.push(new USAPresidentialElectionResultContainer(elt));
        }
    }
});

class USAElectionResultContainer extends ElectionResultContainer{
    addMessages(options){
        const urlFun = (slug, type) => {
            let url = "/usa/";
            switch(type){
                case "senate": url += "senate-elections/state/"; break;
                case "house": url += "house-elections/district/"; break;
                case "governor": url += "gubernatorial-elections/state/"; break;
                case "presidential": default: url += "presidential-elections/state/"
            }
            url += regionToSlug(slug);
            return url;
        }

        super.addMessages({ urlFun: urlFun, ...options });
    }
}
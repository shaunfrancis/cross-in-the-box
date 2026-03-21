window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        switch(elt.getAttribute('data-regions-type')){
            case "house":
                instances.push(new USAHouseElectionResultContainer(elt));
                break;
            case "senate":
                instances.push(new USASenateElectionResultContainer(elt));
                break;
            case "gubernatorial":
                instances.push(new USAGubernatorialElectionResultContainer(elt));
                break;
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
                case "gubernatorial": url += "gubernatorial-elections/state/"; break;
                case "presidential": default: url += "presidential-elections/state/"
            }
            url += regionToSlug(slug);
            return url;
        }

        super.addMessages({
            urlFun: urlFun,
            timezoneArgs: { timeZone: "US/Eastern" },
            ...options
        });
    }
}
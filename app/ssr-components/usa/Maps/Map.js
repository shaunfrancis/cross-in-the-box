class USAPresidential extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }
}

class USAHouse extends Map{
    constructor(container, containerInstance, {election, type, src}){
        super(container, containerInstance, {election, type, src});
    }

    async init(){
        const map = this.structure.container.querySelector('svg');

        // mid-decade redistricting should use same cartographic map with name attributes swapped out onload
        const replaces = [];
        switch(this.election){
            case "H2024":
                replaces.push({state: "AL", from: "2022", to: "2024"});
                replaces.push({state: "GA", from: "2022", to: "2024"});
                replaces.push({state: "LA", from: "2022", to: "2024"});
                replaces.push({state: "NC", from: "2022", to: "2024"});
                replaces.push({state: "NY", from: "2022", to: "2024"});
                break;

            case "H2020":
                replaces.push({state: "NC", from: "2012", to: "2020"});
            case "H2018":
                replaces.push({state: "PA", from: "2012", to: "2018"});
            case "H2016":
                replaces.push({state: "FL", from: "2012", to: "2016"});
                replaces.push({state: "VA", from: "2012", to: "2016"});
                this.election != "H2020" && replaces.push({state: "NC", from: "2012", to: "2016"});
                break;
        }

        replaces.forEach( replace => {
            map.querySelectorAll('[name^="' + replace.from + replace.state + '"]').forEach( path => {
                const district = path.getAttribute('name').substring(6, 8);
                path.setAttribute('name', replace.to + replace.state + district);
            });
        } );
    }
}
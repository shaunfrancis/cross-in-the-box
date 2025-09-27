class Map{
    static instances = [];
    
    constructor(structure){
        Map.instances.push(this);
        this.structure = structure;
    }

    set type(type){
        this.structure.map.container.innerHTML = type;
    }
}
export default class Elt{
    static namespaces = {
        svg: "http://www.w3.org/2000/svg"
    };

    constructor({tag, ns, classList = [], style = {}, innerHTML = null, children = [], ...attributes}){
        const newTag = ns ? document.createElementNS(Elt.namespaces[ns] || ns, tag) : document.createElement(tag);
        newTag.classList.add(...classList);
                
        let styles = "";
        Object.entries(style).forEach( ([key, value]) => {
            if(value) styles += key + ":" + value + ";";
        });
        if(styles.length > 0) newTag.setAttribute('style', styles);

        if(innerHTML) newTag.innerHTML = innerHTML;
        if(children.length > 0) newTag.append(...children);

        Object.entries(attributes).forEach( ([key, value]) => {
            ns ? newTag.setAttributeNS(null, key, value) : newTag.setAttribute(key, value);
        });
        return newTag;
    }
}
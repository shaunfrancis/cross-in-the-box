export default class Elt{
    constructor({tag, classList = [], style = {}, innerHTML = null, ...attributes}){
        const newTag = document.createElement(tag);
        newTag.classList.add(...classList);
                
        let styles = "";
        Object.entries(style).forEach( ([key, value]) => {
            if(value) styles += key + ":" + value + ";";
        });
        if(styles.length > 0) newTag.setAttribute('style', styles);

        if(innerHTML) newTag.innerHTML = innerHTML;

        Object.entries(attributes).forEach( ([key, value]) => {
            newTag.setAttribute(key, value);
        });
        return newTag;
    }
}
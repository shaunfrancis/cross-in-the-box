export default class Elt{
    constructor({tag, classList = [], innerHTML = null, ...attributes}){
        const newTag = document.createElement(tag);
        newTag.classList.add(...classList);
        if(innerHTML) newTag.innerHTML = innerHTML;
        Object.entries(attributes).forEach( ([key, value]) => {
            newTag.setAttribute(key, value);
        });
        return newTag;
    }
}
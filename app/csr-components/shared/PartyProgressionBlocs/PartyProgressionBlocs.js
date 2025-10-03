import Elt from 'components/shared/_Elt/_Elt';

export default class PartyProgressionBlocs{
    static render({ 
        parties,    // Party[]
    }){
        const container = new Elt({ tag: 'div', classList: ["PartyProgressionBlocs"]});
        parties.forEach( (party, index) => {
            if(index !== 0) container.appendChild( new Elt({tag: "img", src: "/public/images/arrow.svg", alt: ""}) );
            container.appendChild(
                new Elt({
                    tag: "div",
                    classList: ["PartyProgressionBlocs__bloc"],
                    style: `background:${party.color}; color:${party.textColor}`,
                    innerHTML: party.displayId
                })
            );
        });
        return container;
    }
}
import Elt from 'components/shared/_Elt/_Elt';

export default class Message{
    static render({ 
        animate = false,            // bool?, 
        noHeader = false,           // bool?
        customHeaderChildren,       // HTMLElement[]
        date = "",                  // string?
        square,                     // Party?
        oldSquare,                  // Party?
        children = []               // (HTMLElement | string)[]
    }){

        const container = new Elt({
            tag: 'div',
            classList: ["Message", animate ? "animate-in" : null].filter(Boolean)
        });

        if(!noHeader){
            const header = container.appendChild( new Elt({
                tag: 'div',
                classList: ["Message__header"]
            }));

            if(!customHeaderChildren){
                header.appendChild( new Elt({ tag: 'span', innerHTML: date }) )
                const squares = header.appendChild( new Elt({
                    tag: 'div',
                    classList: ["Message__squares-container"]
                }) );
                if(oldSquare) squares.append(...[
                    new Elt({ tag:'div', classList:["Message__square"], style:{background: oldSquare.color || "var(--default-color)"}}),
                    new Elt({ tag:'img', src: "/public/images/arrow.svg", alt: "" })
                ]);
                if(square) squares.append(
                    new Elt({ tag: 'div', classList: ["Message__square"], style:{background: square.color || "var(--default-color)"}})
                );
            }

            else header.append(...customHeaderChildren);
        }

        const body = container.appendChild( new Elt({
            tag: 'div',
            classList: ["Message__body"]
        })) ;
        body.append(...children);

        return container;
    }
}
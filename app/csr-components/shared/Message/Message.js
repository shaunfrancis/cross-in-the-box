import Elt from 'components/shared/_Elt/_Elt';

export default class Message{
    static instances = [];

    static render({ 
        id,                         // string
        destination,                // HTMLElement
        isLive = false,             // bool?
        animate = false,            // bool?, 
        noHeader = false,           // bool?
        customHeaderChildren,       // HTMLElement[]
        pinned,                     // string?
        rawDate,                    // Date
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
        if(children.length === 0 || (children.length === 1 && children[0] === "")) container.classList.add("hidden");

        if(!isLive) destination.appendChild(container);
        else{ // live messages, need to find correct location and make any updates

            const existingMessage = this.instances.find(instance => instance.id === id);

            if(existingMessage){
                destination.replaceChild(container, existingMessage.element);
                this.instances = this.instances.filter( instance => instance != existingMessage );
            }
            this.instances.push({ id: id, element: container, date: rawDate, pinned: pinned });

            if(!existingMessage){
                this.instances.sort( (a,b) => {
                    return (a.pinned != b.pinned) ? (a.pinned || Infinity) - (b.pinned || Infinity) : 
                        (a.date.valueOf() != b.date.valueOf()) ? b.date.valueOf() - a.date.valueOf() : b.id - a.id;
                });
                const index = this.instances.findIndex( instance => instance.id === id ) + 1;
                if(!this.instances[index]) destination.appendChild(container);
                else{
                    container.classList.add("animate-in");
                    destination.insertBefore(container, this.instances[index].element);
                }
            }
            
        }

    }
}
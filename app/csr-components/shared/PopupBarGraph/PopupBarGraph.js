import Elt from 'components/shared/_Elt/_Elt';

export default class PopupBarGraph{
    static render({ 
        results,        // Result[]
        parties,        // Party[]
        format = "%",   // "%" | "n"
        goal,           // number?
        title,          // string?
    }){
        
        let totalVotes = 0;
        results.forEach( result => totalVotes += result.votes );

        const container = new Elt({ tag: "div", classList: ["PopupBarGraph"] });
        if(title) container.appendChild( new Elt({tag: 'div', classList: ["PopupBarGraph__title"], innerHTML: title}) );

        results.forEach( result => {
            const percentage = totalVotes == 0 ? 0 : (100 * result.votes / totalVotes).toFixed(2);
            const party = parties.find( party => party.id == result.party ) || globalThis.DefaultParty;
            const bgColor = party.color || "var(--default-color)";

            let numberValue = "";
            if(totalVotes > 0) switch(format){
                case "%":
                    numberValue = percentage + "%"; break;
                case "n": default:
                    numberValue = result.votes.toString();
            }
            else if(result.elected && results.length == 1) numberValue = "Unopposed";
            else if(result.elected) numberValue = "Elected";

            const row = container.appendChild( new Elt({ tag: "div", classList: ["PopupBarGraph__row"] }) );

            const bar = new Elt({ tag: 'div', classList: ["PopupBarGraph__bar-container"] });
            bar.append(...[
                new Elt({
                    tag: 'div',
                    classList: ["PopupBarGraph__bar", "PopupBarGraph__bloc"],
                    style: { background: bgColor, width: totalVotes > 0 ? percentage + "%" : (result.elected ? "100%" : "0%") },
                }),
                goal ? new Elt({tag:'div', classList:["PopupBarGraph__goal"], style:{left: 100*goal + "%"}}) : null,
            ].filter(Boolean));

            row.append(...[
                new Elt({
                    tag: 'div', 
                    classList: ["PopupBarGraph__party", "PopupBarGraph__bloc"], 
                    style: { background: bgColor, color: party.textColor },
                    innerHTML: party.displayId || party.id,
                }),

                new Elt({
                    tag: 'div',
                    classList: ["PopupBarGraph__percentage", "PopupBarGraph__bloc", "tnum"],
                    style: { background: bgColor, color: party.textColor },
                    innerHTML: numberValue,
                }),

                bar
            ]);

        });

        return container;
    }
}
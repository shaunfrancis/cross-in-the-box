import Elt from 'components/shared/_Elt/_Elt';

export default class ElectionSummaryBar{

    static render({ 
        data, // {party : Party, count : number, displayCount? : string}[]
        total = data.reduce( (accumulator, row) => accumulator + row.count, 0 ) || 1    // number?
    }){
        const segments = [];
        data.forEach( row => {
            segments.push(
                new Elt({
                    tag: 'div',
                    classList: ['ElectionSummaryBar__summary-segment'],
                    style: {
                        width: (100 * row.count / total) + "%",
                        background: row.party.color || "var(--default-color)", 
                        color: row.party.textColor
                    },
                    children: [
                        new Elt({
                            tag: 'span',
                            classList: ["ElectionSummaryBar__summary-segment-party"],
                            innerHTML: row.candidate || row.party.displayId || row.party.id
                        }),
                        new Elt({
                            tag: 'span',
                            classList: ["ElectionSummaryBar__summary-segment-count"],
                            innerHTML: row.displayCount || row.count
                        })
                    ]
                })
            );
        });

        const currentTotal = data.reduce( (accumulator, row) => accumulator + row.count, 0 ) || 1;
        if(currentTotal < total){ //in live mode and awaiting results
            const segment = new Elt({
                tag: 'div',
                classList: ["ElectionSummaryBar__summary-segment", "outstanding"],
                style: { width: (100 * (total - currentTotal) / total) + "%" }
            });

            if(segments.length == 2) segments.splice(1,0,segment);
            else segments.push(segment);
        }

        return new Elt({
            tag: 'div',
            classList: ["ElectionSummaryBar"],
            children: segments
        })

    }

}
import Elt from 'components/shared/_Elt/_Elt';
import HoverPopup from 'components/shared/HoverPopup/HoverPopup';

export default class ElectionSummaryBar{

    static render({ 
        data, // {party : Party, count : number, displayCount? : string}[]
        total = data.reduce( (accumulator, row) => accumulator + row.count, 0 ) || 1,    // number?
        threshold = 0.05, // number?
        prioritisePartyDisplay = false, // boolean?
    }){
        const popup = new Elt({ tag: 'div', classList: ["ElectionSummaryBar__hover-popup", "hover-popup", "hidden"] });

        const segments = [];
        let sumBelowThreshold = 0;
        const dataBelowThreshold = [];

        data.forEach( row => {
            if(row.count / total < threshold){
                sumBelowThreshold += row.count;
                dataBelowThreshold.push(row);
                return;
            }
            const segment = new Elt({
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
                        classList: ["ElectionSummaryBar__summary-segment-party", prioritisePartyDisplay ? "prioritise" : null],
                        innerHTML: row.displayCandidate || row.candidate || row.party.displayId || row.party.id
                    }),
                    new Elt({
                        tag: 'span',
                        classList: ["ElectionSummaryBar__summary-segment-count"],
                        innerHTML: row.displayCount || row.count
                    })
                ]
            });
            HoverPopup.attach({
                container: popup,
                trigger: segment,
                content: () => {
                    popup.innerHTML = `
                        <h3>${row.displayCount || row.count}</h3>
                        <h4>${row.candidate}</h4>
                        <div class="ElectionSummaryBar__hover-party">
                            <div class="square" style="background:${row.party.color || "var(--default-color)"}"></div>
                            <span>${row.party.title}</span>
                        </div>
                    `;
                }
            });

            segments.push(segment);
        });

        if(dataBelowThreshold.length > 0){
            const otherSegment = new Elt({
                tag: 'div',
                classList: ['ElectionSummaryBar__summary-segment'],
                style: {
                    width: (100 * sumBelowThreshold / total) + "%",
                    background: "var(--light-default-color)"
                }
            });
            HoverPopup.attach({
                container: popup,
                trigger: otherSegment,
                content: () => {
                    popup.innerHTML = "";
                    dataBelowThreshold.forEach( row => {
                        popup.appendChild( new Elt({
                            tag: 'div',
                            classList: ["ElectionSummaryBar__hover-section"],
                            innerHTML: `
                                <h4>${row.displayCount || row.count} &bull; ${row.candidate}</h4>
                                <div class="ElectionSummaryBar__hover-party">
                                    <div class="square" style="background:${row.party.color || "var(--default-color)"}"></div>
                                    <span>${row.party.title}</span>
                                </div>
                            `
                        }) );
                    });
                }
            });
            segments.push(otherSegment);
        }

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
            children: [...segments, popup]
        })

    }

}
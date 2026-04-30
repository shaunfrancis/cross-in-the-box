import Elt from 'components/shared/_Elt/_Elt';
import HoverPopup from 'components/shared/HoverPopup/HoverPopup';

export default class ElectionSummaryStaggeredBars{

    static render({ 
        currentData, // {party : Party, count : number, displayCount? : string}[]
        ghostData, // {party : Party, count : number, displayCount? : string}[]
        total = (
            currentData.reduce( (accumulator, row) => accumulator + row.count, 0 ) 
            + ghostData.reduce( (accumulator, row) => accumulator + row.count, 0 ) 
        ) || 1,    // number?
    }){
        const popup = new Elt({ tag: 'div', classList: ["ElectionSummaryBar__hover-popup", "hover-popup", "hidden"] });
        document.body.appendChild(popup); // ensure always on top

        const groups = [];

        [...currentData, ...ghostData].forEach( summary => {
            const partyGroup = ("linked_to" in summary.party && "link_type" in summary.party && summary.party.link_type == 1)
                ? [...currentData, ...ghostData].find( s => s.party.id === summary.party.linked_to )?.party || summary.party
                : summary.party;

            const existingGroup = groups.find( group => group.group === partyGroup );
            if(!existingGroup){
                groups.push({
                    group: partyGroup,
                    count: summary.count,
                    segments: [{
                        party: summary.party,
                        isGhost: ghostData.includes(summary),
                        count: summary.count
                    }]
                });
            }
            else{
                existingGroup.count += summary.count;
                existingGroup.segments.push({
                    party: summary.party,
                    isGhost: ghostData.includes(summary),
                    count: summary.count
                });
            }
        });

        let maxCount = -1;
        groups.forEach( group => { if(group.count > maxCount) maxCount = group.count });
        groups.sort( (a,b) => {
            const countDifference = b.count - a.count;
            return countDifference !== 0 ? countDifference : a.group.displayId.localeCompare(b.group.displayId);
        });
        
        const bars = [];
        groups.forEach( group => {
            let nonGhostWidth = 0;
            group.segments.forEach( segment => {
                if(!segment.isGhost) nonGhostWidth += segment.count / group.count * 100;
            });

            const label = new Elt({
                tag: 'div',
                classList: ["ElectionSummaryStaggeredBars__label-container"],
                children: [
                    new Elt({
                        tag: 'div',
                        classList: ["ElectionSummaryStaggeredBars__label"],
                        style: {
                            color: group.group.textColor,
                            "clip-path": `inset(0 ${100 - nonGhostWidth}% 0 0)`
                        },
                        children: [
                            new Elt({ tag: 'span', classList: ["ElectionSummaryStaggeredBars__party"], innerHTML: group.group.displayId }),
                            new Elt({ tag: 'span', classList: ["ElectionSummaryStaggeredBars__count"], innerHTML: group.count }),
                        ]
                    }),
                    new Elt({
                        tag: 'div',
                        classList: ["ElectionSummaryStaggeredBars__label"],
                        style: { "clip-path": `inset(0 -100vw 0 ${nonGhostWidth}%)` },
                        children: [
                            new Elt({ tag: 'span', classList: ["ElectionSummaryStaggeredBars__party"], innerHTML: group.group.displayId }),
                            new Elt({ tag: 'span', classList: ["ElectionSummaryStaggeredBars__count"], innerHTML: group.count }),
                        ]
                    })
                ]
            });

            const bar = new Elt({
                tag: 'div',
                classList: ["ElectionSummaryStaggeredBars__bar"],
                style: { width: group.count / maxCount * 100 + "%" },
                children: [
                    label,
                    ...group.segments.map( segment => new Elt({
                        tag: 'div',
                        classList: [segment.isGhost ? "ElectionSummaryStaggeredBars__ghost-segment" : "ElectionSummaryStaggeredBars__segment"],
                        style: {
                            width: segment.count / group.count * 100 + "%",
                            background: segment.party.color || "var(--default-color)"
                        }
                    }))

                ]
            });

            const combinedTotals = [];
            group.segments.forEach( segment => {
                const existingRow = combinedTotals.find( row => row.party === segment.party );
                if(!existingRow) combinedTotals.push({ ...segment });
                else existingRow.count += segment.count;
            });
            combinedTotals.sort( (a,b) => b.count - a.count );

            HoverPopup.attach({
                container: popup,
                trigger: bar,
                content: () => {
                    popup.innerHTML = "";
                    combinedTotals.forEach( row => {
                        popup.appendChild( new Elt({
                            tag: 'div',
                            classList: ["hr-separated"],
                            innerHTML: `
                                <h3>${row.displayCount || row.count}</h3>
                                <div class="ElectionSummaryBar__hover-party">
                                    <div class="square" style="background:${row.party.color || "var(--default-color)"}"></div>
                                    <span>${outputPartyTitles(row.party.titles)}</span>
                                </div>
                            `
                        }) );
                    });
                }
            });

            bars.push(bar);
        });

        return new Elt({
            tag: 'div',
            classList: ["ElectionSummaryStaggeredBars"],
            style: { width: maxCount / total * 100 + "%" },
            children: bars
        });

    }

}
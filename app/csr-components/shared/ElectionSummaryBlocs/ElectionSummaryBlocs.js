import Elt from 'components/shared/_Elt/_Elt';

export default class ElectionSummaryBlocs{
    static activeContainers = [];
    static set hover(bool){
        this.activeContainers.forEach(container => {
            if(bool) container.classList.add('hidden-rows-visible');
            else container.classList.remove('hidden-rows-visible');
        });
    }

    static render({ 
        data,                   // {party : Party, count : number, displayCount? : string}[]
        rowLength = Infinity,   // number?
    }){
        const container = new Elt({
            tag: 'div',
            classList: ["ElectionSummaryBlocs"]
        });
        this.activeContainers.push(container);

        const shouldShowOther = data.length > rowLength;
        let totalOther = 0;
        if(shouldShowOther){
            data.slice(rowLength - 1).forEach( result => {
                totalOther += result.count;
            });
        }

        for(let i = 0; i < (shouldShowOther ? (data.length + 1) : data.length) / rowLength; i++){
            const blocs = [];
            for(let j = 0; j < rowLength; j++){
                const position = (shouldShowOther && (i > 0 || j >= 4)) ? i*rowLength + j - 1 : i*rowLength + j;
                if(position >= data.length) break;

                if(shouldShowOther && i == 0 && j == 4){
                    const bloc = new Elt({tag: 'div', classList: ["ElectionSummaryBlocs__bloc", "other-bloc"]});
                    bloc.addEventListener('mouseover', () => { this.hover = true });
                    bloc.addEventListener('mouseout', () => { this.hover = false });
                    
                    bloc.appendChild(
                        new Elt({tag: 'span', classList: ["ElectionSummaryBlocs__party"], innerHTML: "Other"})
                    );
                    bloc.appendChild(
                        new Elt({tag: 'span', classList: ["ElectionSummaryBlocs__count"], innerHTML : totalOther})
                    );
                    blocs.push(bloc);
                }
                else{
                    const bloc = new Elt({
                        tag: 'div',
                        classList: ["ElectionSummaryBlocs__bloc"],
                        style: "background: " + (data[position].party.color || "var(--default-color)") + ";" + 
                            "color: " + data[position].party.textColor
                    });
                    bloc.appendChild(
                        new Elt({tag: 'span', classList: ["ElectionSummaryBlocs__party"], innerHTML: data[position].party.displayId || data[position].party.id})
                    );
                    bloc.appendChild(
                        new Elt({tag: 'span', classList: ["ElectionSummaryBlocs__count"], innerHTML: data[position].displayCount || data[position].count})
                    );
                    blocs.push(bloc);
                }
            }

            const row = new Elt({
                tag: 'div',
                classList: [
                    "ElectionSummaryBlocs__row",
                    (i === 0 ? null : "hidden-row"),
                    (rowLength === Infinity ? "single-row" : null)
                ].filter(Boolean)
            });
            blocs.forEach(bloc => row.appendChild(bloc));
            container.appendChild(row);
        }

        setTimeout( () => { container.classList.add('visible'); }, 1);
        
        return container;
    }
}
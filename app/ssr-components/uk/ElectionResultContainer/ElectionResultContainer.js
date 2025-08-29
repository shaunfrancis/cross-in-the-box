import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';

window.addEventListener('DOMContentLoaded', () => {
    const instances = [];
    for(const elt of document.querySelectorAll('.ElectionResultContainer')){
        instances.push(
            new UKElectionResultContainer(elt)
        );
    }
});

class UKElectionResultContainer extends ElectionResultContainer{
    constructor(elt){
        super(elt);
    }

    addSummary(){
        this.structure.summary.container.appendChild( ElectionSummaryBlocs.render({ innerHTML: "example" }) );
    }
}
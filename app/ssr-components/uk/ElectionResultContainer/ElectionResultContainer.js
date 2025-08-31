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
        super(elt, UKGeneral);
    }

    addSummary(){
        const summaries = []; // {party : Party, count : number}[]
        this.winFormula(this.data.results).forEach( result => {
            
            const regionUpdates = this.data.updates.filter( u => u.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;

            if(!summaries.find( summary => summary.party.id == winner)){
                const party = CachedData.parties.find( party => party.id === result.party) || DefaultParty;
                summaries.push({ party: party, count: 1 });
            }
            else summaries.find( summary => summary.party.id == winner ).count++;

        });
        summaries.sort( (a,b) => {
            const getCount = (x) => {
                return (["vacant","speaker","ind"].includes(x.party.id)) ? -Infinity : x.count;
            }
            return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
            } );
        
        this.structure.summary.container.appendChild( 
            ElectionSummaryBlocs.render({ data: summaries, rowLength: 5 })
        );
    }
}
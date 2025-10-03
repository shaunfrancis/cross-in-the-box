import Elt from 'components/shared/_Elt/_Elt';
import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PartyProgressionBlocs from 'components/shared/PartyProgressionBlocs/PartyProgressionBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';

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
            
            const regionUpdates = this.data.updates.filter( update => update.id == result.id );
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

    fillMap(data){
        data.hoverFun = (active, popup, id) => {
            if(!active) return;
            popup.innerHTML = "";

            const region = CachedData.regions.find( region => region.id == id );
            const regionResults = this.data.results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
            const regionUpdates = this.data.updates.filter( update => update.id == region.id );

            // Title
            if(!region) return popup.appendChild( new Elt({tag: 'h3', innerHTML: "Missing data"}) );
            popup.appendChild( new Elt({tag: 'h3', innerHTML: region.title}) );

            // Winning candidate
            const winner = this.winFormula(regionResults)[0]?.candidate;
            if(winner) popup.appendChild( new Elt({tag: 'h4', innerHTML: winner}) );

            // Party progression blocs
            const partyProgression = [CachedData.parties.find( party => party.id === this.winFormula(regionResults)[0]?.party ) || DefaultParty];
            regionUpdates.forEach( update => {
                partyProgression.push( CachedData.parties.find( party => party.id == update.party ) || DefaultParty );
            });
            if(partyProgression.length > 1) popup.appendChild( PartyProgressionBlocs.render({ parties: partyProgression }) );

            // Bar graph
            popup.appendChild( PopupBarGraph.render({ results: regionResults, parties: CachedData.parties }) );
        };
        super.fillMap(data);
    }
}

/*
        const watchNote = election == "2024" && UKSeatsToWatch.find(s => s.id == id)?.note;
        
        return ( <>
            <h3>{region.title}</h3>
            {winner && <h4>{winner}</h4>}
            {!winner && <div style={{maxWidth: "350px"}}>{watchNote}</div>}
            { partyProgression.length > 1 && <PartyProgressionBlocs parties={partyProgression} /> }
            <PopupBarGraph results={regionResults} parties={parties} />
        </> )*/
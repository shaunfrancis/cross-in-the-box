window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.RegionBarGraph')){
        for(const row of container.querySelectorAll('.RegionBarGraph__row')){
            const partyId = row.getAttribute('data-party');
            const blocs = {
                party: row.querySelector('.RegionBarGraph__party'),
                candidate: row.querySelector('.RegionBarGraph__candidate'),
                votes: row.querySelector('.RegionBarGraph__votes'),
                percentage: row.querySelector('.RegionBarGraph__percentage'),
                bar: row.querySelector('.RegionBarGraph__bar'),
            };
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            Object.values(blocs).forEach( elt => {
                if(!elt) return;
                elt.style.background = party.color || "var(--default-color)";
                if(party.textColor) elt.style.color = party.textColor;
            });
            blocs.party.querySelector('span').innerHTML = party.displayId;
            row.querySelector('.RegionBarGraph__hover').innerHTML = party.title;
        }
        container.classList.remove('pre-hydration');
    }
});
window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();
    
    for(const container of document.querySelectorAll('.RegionBarGraph')){

        for(const row of container.querySelectorAll('.RegionBarGraph__row:not(.RegionBarGraph__heading)')){
            const partyId = row.getAttribute('data-party');
            const blocs = {
                party: row.querySelectorAll('.RegionBarGraph__party'),
                candidate: row.querySelectorAll('.RegionBarGraph__candidate'),
                votes: row.querySelectorAll('.RegionBarGraph__votes:not(.RegionBarGraph__eliminated)'),
                percentage: row.querySelectorAll('.RegionBarGraph__percentage:not(.RegionBarGraph__eliminated)'),
                bar: row.querySelectorAll('.RegionBarGraph__bar'),
            };
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            Object.values(blocs).forEach( elts => {
                if(!elts) return;
                elts.forEach( elt => {
                    elt.style.background = party.color || "var(--default-color)";
                    if(party.textColor) elt.style.color = party.textColor;
                });
            });
            blocs.party[0].querySelector('span').innerHTML = party.displayId;
            row.querySelector('.RegionBarGraph__hover').innerHTML = party.title;
        }
        container.classList.remove('pre-hydration');
    }
});
window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();
    
    for(const container of document.querySelectorAll('.RegionBarGraph')){

        for(const row of container.querySelectorAll('.RegionBarGraph__row:not(.RegionBarGraph__heading)')){
            const isFusionRow = row.classList.contains('RegionBarGraph__fusion-total-row');

            const partyId = row.getAttribute('data-party');
            const blocs = {
                party: row.querySelectorAll('.RegionBarGraph__party'),
                candidate: row.querySelectorAll('.RegionBarGraph__candidate'),
                votes: row.querySelectorAll('.RegionBarGraph__votes:not(.RegionBarGraph__eliminated)'),
                percentage: row.querySelectorAll('.RegionBarGraph__percentage:not(.RegionBarGraph__eliminated)'),
                bar: isFusionRow ? [] : row.querySelectorAll('.RegionBarGraph__bar'),
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

            if(isFusionRow){
                const fusionCount = parseInt(row.getAttribute('data-fusion-count') || 0) - 1;
                blocs.party[0].querySelector('span').innerHTML += " + " + (fusionCount || "...");
                row.querySelector('.RegionBarGraph__hover').innerHTML += " and " + (fusionCount ? fusionCount + " " : "") + "other part" + (fusionCount === 1 ? "y" : "ies");
            }
        }

        for(const bar of container.querySelectorAll('.RegionBarGraph__fusion-total-row .RegionBarGraph__bar')){
            let party = CachedData.parties.find( p => p.id === bar.getAttribute('data-party') );
            if(!party) party = DefaultParty;
            bar.style.background = party.color || "var(--default-color)";
        }

        for(const fusionRow of container.querySelectorAll('.RegionBarGraph__fusion-total-row')){

            const hiddenRows = container.querySelectorAll(`.RegionBarGraph__fusion-hidden-row[data-fusion-group="${fusionRow.getAttribute('data-fusion-group')}"]`);

            fusionRow.addEventListener('click', () => {
                fusionRow.classList.toggle('open');
                if(fusionRow.classList.contains('open')) hiddenRows.forEach( row => row.classList.add('visible') );
                else hiddenRows.forEach( row => row.classList.remove('visible') );
            });
        }

        container.classList.remove('pre-hydration');
    }
});
window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.STVTable')){
        for(const row of container.querySelectorAll('.STVTable__row')){
            const partyId = row.getAttribute('data-party');

            const partyBloc = row.querySelector('.STVTable__party');
            if(!partyBloc) continue;
            const blocs = [partyBloc, ...row.querySelectorAll('.STVTable__elected')];
            
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            blocs.forEach( bloc => {
                bloc.style.background = party.color || "var(--default-color)";
                if(party.textColor) bloc.style.color = party.textColor;
            });
            
            if(partyBloc) partyBloc.querySelector('span').innerHTML = party.displayId;
            row.querySelector('.STVTable__hover').innerHTML = party.title;
        }
        container.classList.remove('pre-hydration');
    }
});
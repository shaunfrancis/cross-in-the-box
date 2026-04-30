window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.SainteLagueTable')){
        for(const row of container.querySelectorAll('.SainteLagueTable__row')){
            const partyId = row.getAttribute('data-party');

            const partyBloc = row.querySelector('.SainteLagueTable__party');
            if(!partyBloc) continue;
            const blocs = [partyBloc, ...row.querySelectorAll('.SainteLagueTable__elected')];
            
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            blocs.forEach( bloc => {
                bloc.style.backgroundColor = party.color || "var(--default-color)";
                if(party.textColor) bloc.style.color = party.textColor;
            });
            row.querySelectorAll('.SainteLagueTable__leading').forEach( bloc => {
                bloc.style.outline = `2px solid ${party.color || "var(--default-color)"}`;
            });
            
            if(partyBloc) partyBloc.querySelector('span').innerHTML = party.displayId;
            if(party.id != "ind") row.querySelector('.SainteLagueTable__hover').innerHTML = party.title;
        }
        container.classList.remove('pre-hydration');
    }
});
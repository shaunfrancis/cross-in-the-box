window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.DHondtTable')){
        for(const row of container.querySelectorAll('.DHondtTable__row')){
            const partyId = row.getAttribute('data-party');

            const partyBloc = row.querySelector('.DHondtTable__party');
            if(!partyBloc) continue;
            const blocs = [partyBloc, ...row.querySelectorAll('.DHondtTable__elected')];
            
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            blocs.forEach( bloc => {
                bloc.style.background = party.color || "var(--default-color)";
                if(party.textColor) bloc.style.color = party.textColor;
            });
            row.querySelectorAll('.DHondtTable__leading').forEach( bloc => {
                bloc.style.outline = `2px solid ${party.color || "var(--default-color)"}`;
            });
            
            if(partyBloc) partyBloc.querySelector('span').innerHTML = party.displayId;
            if(party.id != "ind") row.querySelector('.DHondtTable__hover').innerHTML = outputPartyTitles(party.titles);
        }
        container.classList.remove('pre-hydration');
    }
});
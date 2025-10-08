window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.RegionPage')){
        for(const bloc of container.querySelectorAll('.RegionPage__party-bloc')){
            const partyId = bloc.getAttribute('data-party');
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;
           
            bloc.style.background = party.color || "var(--default-color)";
            if(party.textColor) bloc.style.color = party.textColor;
            bloc.innerHTML = party.displayId;
        }
        container.classList.remove('pre-hydration');
    }
});
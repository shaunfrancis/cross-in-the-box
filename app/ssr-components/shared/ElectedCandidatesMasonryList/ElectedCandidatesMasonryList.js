window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.ElectedCandidatesMasonryList')){
        for(const item of container.querySelectorAll('.ElectedCandidatesMasonryList__item')){
            const partyId = item.getAttribute('data-party');
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            const title = item.querySelector('.ElectedCandidatesMasonryList__title');
            title.querySelector('span:first-child').innerHTML = party.displayId;
            title.style.background = party.color || "var(--default-color)";
            if(party.textColor) title.style.color = party.textColor;
        }
        container.classList.remove('pre-hydration');
    }
});
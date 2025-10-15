window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    for(const container of document.querySelectorAll('.CandidatesMasonryList')){
        for(const item of container.querySelectorAll('.CandidatesMasonryList__item')){
            const partyId = item.getAttribute('data-party');
            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;

            const title = item.querySelector('.CandidatesMasonryList__title');
            title.innerHTML = party.displayId;
            [ title, ...item.querySelectorAll('.CandidatesMasonryList__elected > td') ].forEach( elt => {
                if(!elt) return;
                elt.style.background = party.color || "var(--default-color)";
                if(party.textColor) elt.style.color = party.textColor;
            });
        }
        container.classList.remove('pre-hydration');
    }
});
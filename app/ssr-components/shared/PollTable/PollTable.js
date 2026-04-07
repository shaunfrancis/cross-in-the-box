window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();
    
    for(const container of document.querySelectorAll('.PollTable')){

        const getParty = (elt) => {
            const partyId = elt.getAttribute('data-party');
            if(partyId == "other") return { displayId: "Other", color: "var(--default-color)" }; // special default for polling

            let party = CachedData.parties.find( p => p.id === partyId );
            if(!party) party = DefaultParty;
            return party;
        }

        for(const bloc of container.querySelectorAll('[data-party]')){
            const party = getParty(bloc);
            bloc.style.background = party.color || "var(--default-color)";
            if(party.textColor) bloc.style.color = party.textColor;
        }
        for(const bloc of container.querySelectorAll('.PollTable__header [data-party]')){
            const party = getParty(bloc);
            bloc.innerHTML = party.displayId || party.id;
        }

        container.classList.remove('pre-hydration');
    }
});
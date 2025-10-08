class Toggle{
    static register(id, fun){
        const toggles = document.querySelectorAll('.Toggle[data-id="' + id + '"]');
        let state = false;
        for(const toggle of toggles){

            const inner = (elt) => elt.querySelector('.Toggle__inner');
            const outer = (elt) => elt.querySelector('.Toggle__outer');

            if(inner(toggle) && outer(toggle)) outer(toggle).addEventListener('click', () => {
                state = !state;
                toggles.forEach( t => inner(t).classList.toggle('Toggle__toggled') );
                fun(state);
            });

            const off = toggle.querySelector('.Toggle__off');
            if(off) off.addEventListener('click', () => {
                state = false;
                toggles.forEach( t => inner(t).classList.remove('Toggle__toggled') );
                fun(false);
            });

            const on = toggle.querySelector('.Toggle__on');
            if(on) on.addEventListener('click', () => {
                state = true;
                toggles.forEach( t => inner(t).classList.add('Toggle__toggled') );
                fun(true);
            });
            
        }
    }
}
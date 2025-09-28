class Toggle{
    static register(id, fun){
        const elts = document.querySelectorAll('.Toggle[data-id="' + id + '"]');
        for(const elt of elts){

            let state = false;
            const inner = elt.querySelector('.Toggle__inner');
            const outer = elt.querySelector('.Toggle__outer');
            if(inner && outer) outer.addEventListener('click', () => {
                state = !state;
                inner.classList.toggle('Toggle__toggled');
                fun(state);
            });

            const off = elt.querySelector('.Toggle__off');
            if(off) off.addEventListener('click', () => {
                inner.classList.remove('Toggle__toggled');
                fun(false);
            });

            const on = elt.querySelector('.Toggle__on');
            if(on) on.addEventListener('click', () => {
                inner.classList.add('Toggle__toggled');
                fun(true);
            });
            
        }
    }
}
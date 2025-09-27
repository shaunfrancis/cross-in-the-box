class Toggle{
    static register(id, fun){
        const elts = document.querySelectorAll('.Toggle[data-id="' + id + '"]');
        for(const elt of elts){
            const off = elt.querySelector('.Toggle__off');
            const on = elt.querySelector('.Toggle__on');

            const inner = elt.querySelector('.Toggle__inner');
            const outer = elt.querySelector('.Toggle__outer');

            let state = false;
            outer.addEventListener('click', () => {
                state = !state;
                inner.classList.toggle('Toggle__toggled');
                fun(state);
            });
            off.addEventListener('click', () => {
                inner.classList.remove('Toggle__toggled');
                fun(false);
            });
            on.addEventListener('click', () => {
                inner.classList.add('Toggle__toggled');
                fun(true);
            });
        }
    }
}
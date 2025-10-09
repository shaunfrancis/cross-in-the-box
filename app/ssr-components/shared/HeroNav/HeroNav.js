window.addEventListener('DOMContentLoaded', () => {
    for(const item of document.getElementsByClassName('HeroNav__item')){
        const section = document.getElementById(item.getAttribute('data-id'));
        if(section) item.addEventListener('click', () => {
            section.scrollIntoView({behavior: "smooth"});
        });

        const focusSelector = item.getAttribute('data-focus');
        if(focusSelector) item.addEventListener('click', () => { 
            document.querySelector(focusSelector)?.focus();
        });
    }
});
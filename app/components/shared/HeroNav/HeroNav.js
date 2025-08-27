window.addEventListener('DOMContentLoaded', () => {
    for(const item of document.getElementsByClassName('HeroNav__item')){
        const section = document.getElementById(item.getAttribute('data-id'));
        if(section) item.addEventListener('click', () => {
            section.scrollIntoView({behavior: "smooth"});
        });
    }
});
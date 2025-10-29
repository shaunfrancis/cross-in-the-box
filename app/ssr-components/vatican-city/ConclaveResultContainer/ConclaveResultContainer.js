let seedrandom = require('seedrandom');
window.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.ConclaveResultContainer__result-container')].forEach( container => {
        const seed = container.getAttribute('data-seed');
        const elected = container.getAttribute('data-elected') == "false" ? false : true;
        const electors = container.getAttribute('data-electors');
        const map = container.querySelector('svg');

        const origin = [40, 185];
        const minSize = 15;
        const maxSize = 15;
        const farthestPoint = [240 - maxSize, 240 - maxSize];

        const random = new seedrandom(seed);

        const smokeGroup = map.querySelector('g[name="smoke-group"]');
        smokeGroup.setAttribute('fill', elected ? "#FFF" : "#000");
        smokeGroup.setAttribute('stroke', elected ? "#000" : "#FFF");
        for(let i = 0; i < electors; i++){
            const size = (minSize + (maxSize - minSize) * Math.round(random() * 10) / 10).toString();
            const step = i / electors;
        
            const rise = step * (132 - maxSize); 
        
            const maxXSpread = step * (farthestPoint[0] - origin[0]);
            const maxYSpread = step * 80;
        
            const canGoLeft = random() < (1 - step); //higher chance near chimney
            const offsetX = (random() * maxXSpread) - (canGoLeft ? random() * 40 : 0);

            const offsetY = (random() - 0.5) * maxYSpread;
        
            const x = origin[0] + offsetX;
            const y = origin[1] - rise + offsetY;

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttributeNS(null, 'x', x.toString());
            rect.setAttributeNS(null, 'y', y.toString());
            rect.setAttributeNS(null, 'width', size);
            rect.setAttributeNS(null, 'height', size);
            rect.addEventListener('mousemove', (event) => { hoverFun(true, event, elected) } );
            rect.addEventListener('mouseout', () => { hoverFun(false) } );
            smokeGroup.appendChild(rect);
        };

        const smokeMouseCapture = map.querySelector('path[name="smoke-mouse-capture"]');
        const popup = container.querySelector('.hover-popup');
        smokeMouseCapture.addEventListener('mousemove', (event) => {
            const coordinates = [event.clientX, event.clientY];
            const width = popup.offsetWidth;
            const height = popup.offsetHeight;

            const offsets = [0,0];
            if(coordinates[0] + 20 + width > window.innerWidth) offsets[0] = -(width + 40);
            if(coordinates[1] + 20 + height > window.innerHeight) offsets[1] = window.innerHeight - height - 20 - coordinates[1];

            popup.style.left = coordinates[0] + offsets[0] + 20 + "px";
            popup.style.top = coordinates[1] + offsets[1] + 20 + "px";
            popup.classList.remove('hidden');
        });
        smokeMouseCapture.addEventListener('mouseout', () => { popup.classList.add('hidden') });

    });
});
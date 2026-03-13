import HoverPopup from 'components/shared/HoverPopup/HoverPopup';

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
            smokeGroup.appendChild(rect);
        };

        HoverPopup.attach({
            container: container.querySelector('.hover-popup'),
            trigger: map.querySelector('path[name="smoke-mouse-capture"]')
        })

    });
});
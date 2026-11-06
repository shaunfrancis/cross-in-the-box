export default class HoverPopup{
    static attach({
        container,          // HTMLElement
        trigger,            // HTMLElement
        content = (container) => {},
        signal = null,      // AbortSignal?
    }){
        const init = (container) => {
            document.querySelectorAll('body > .hover-popup').forEach( stalePopup => {
                if(stalePopup === container) return;
                stalePopup.remove();
            } );
            if(!container.parentElement) document.body.appendChild(container); // ensure always on top
        };

        const position = (event) => {
            const coordinates = [event.clientX, event.clientY];
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            const offsets = [0,0];
            if(coordinates[0] + 20 + width > window.innerWidth) offsets[0] = -(width + 40);
            if(coordinates[1] + 20 + height > window.innerHeight) offsets[1] = window.innerHeight - height - 20 - coordinates[1];

            container.style.left = coordinates[0] + offsets[0] + 20 + "px";
            container.style.top = coordinates[1] + offsets[1] + 20 + "px";
            container.classList.remove('hidden');
        };

        trigger.addEventListener('mouseover', (event) => {
            init(container);
            content(container);
            position(event); 
        }, signal && { signal: signal });

        trigger.addEventListener('mousemove', position, signal && { signal: signal });

        trigger.addEventListener('mouseout', () => { container.classList.add('hidden') }, signal && { signal: signal });
    }
}
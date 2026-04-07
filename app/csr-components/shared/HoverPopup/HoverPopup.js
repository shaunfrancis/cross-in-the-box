export default class HoverPopup{
    static attach({
        container,          // HTMLElement
        trigger,            // HTMLElement
        content = (container) => {},
        signal = null,      // AbortSignal?
    }){
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

        trigger.addEventListener('mouseover', (event) => { content(container); position(event); }, signal && { signal: signal });

        trigger.addEventListener('mousemove', position, signal && { signal: signal });

        trigger.addEventListener('mouseout', () => { container.classList.add('hidden') }, signal && { signal: signal });
    }
}
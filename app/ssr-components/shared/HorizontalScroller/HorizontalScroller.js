import Elt from 'components/shared/_Elt/_Elt';

window.addEventListener('DOMContentLoaded', () => {
    const scrollers = document.querySelectorAll('.HorizontalScroller');
    scrollers.forEach( scroller => {
        const id = scroller.getAttribute('data-id');
        scroller.removeAttribute('data-id');

        const container = document.querySelector(`[data-scroller="${id}"]`);
        if(!container){
            scroller.remove();
            return;
        }
        container.removeAttribute('data-scroller');

        const observer = new ResizeObserver(() => { sizeReflow() });
        observer.observe(container);

        const itemsContainer = scroller.querySelector('.HorizontalScroller__items');
        const items = new WeakMap();
        for(const child of container.children){
            observer.observe(child);
            const item = new Elt({
                tag: 'div',
                innerHTML: child.querySelector(':is(h1,h2)').textContent.replace(/\n/g, " ").replace(/ +/g, " ").trim()
            });
            itemsContainer.appendChild(item);
            items.set(child, item);
        }

        const thumb = scroller.querySelector('.HorizontalScroller__thumb');
        const containerStyles = {};
        const sizeReflow = () => {
            if(container.scrollWidth <= window.innerWidth){
                scroller.classList.add('hidden');
                return;
            }
            else scroller.classList.remove('hidden');

            const containerComputedStyle = getComputedStyle(container);
            containerStyles.paddingLeft = parseFloat(containerComputedStyle.getPropertyValue('padding-left'));
            containerStyles.paddingRight = parseFloat(containerComputedStyle.getPropertyValue('padding-right'));
            containerStyles.gap = parseFloat(containerComputedStyle.getPropertyValue('column-gap'));

            const containerWidth = container.scrollWidth
                - containerStyles.paddingLeft - containerStyles.paddingRight - (container.children.length - 1) * containerStyles.gap;

            for(const child of container.children){
                const width = child.offsetWidth;
                const item = items.get(child);
                item.style.width = width / containerWidth * 100 + "%";
            }

            const thumbWidth = (100 * window.innerWidth / containerWidth).toFixed(2);
            thumb.style.width = thumbWidth + "%";
            const adjustThumbPosition = () => {
                const thumbOffset = (container.scrollLeft - containerStyles.paddingLeft)
                    / (container.scrollWidth - containerStyles.paddingLeft - containerStyles.paddingRight - window.innerWidth);
                thumb.style.left = (100 * thumbOffset - (thumbWidth * thumbOffset)).toFixed(2) + "%";
            };
            adjustThumbPosition();
            container.addEventListener('scroll', adjustThumbPosition);

        };
        sizeReflow();

        let initialX = -1;
        const thumbDown = event => {
            initialX = event.clientX;
            window.addEventListener('mousemove', thumbMove);
            window.addEventListener('mouseup', thumbUp);
        };
        const thumbUp = () => {
            window.removeEventListener('mousemove', thumbMove);
            window.removeEventListener('mouseup', thumbUp);
        }
        const thumbMove = event => {
            const deltaX = (event.clientX - initialX) * container.scrollWidth / (window.innerWidth - containerStyles.paddingLeft - containerStyles.paddingRight);
            initialX = event.clientX;
            container.scrollLeft += deltaX;
        }
        thumb.addEventListener('mousedown', thumbDown);

        itemsContainer.addEventListener('click', event => {
            const containerWidth = container.scrollWidth
                - containerStyles.paddingLeft - containerStyles.paddingRight - (container.children.length - 1) * containerStyles.gap;
            container.scrollLeft = (event.offsetX / itemsContainer.clientWidth - window.innerWidth / containerWidth / 2) * container.scrollWidth;
        });

        const scrollToNext = (direction) => {
            // just scroll by the average width of a child for now and can always make more intelligent in the future
            container.scrollLeft += (1 / container.children.length) * container.scrollWidth * direction;
        };
        scroller.querySelector('.HorizontalScroller__button:first-child').addEventListener('click', () => { scrollToNext(-1) });
        scroller.querySelector('.HorizontalScroller__button:last-child').addEventListener('click', () => { scrollToNext(1) });

    });
});
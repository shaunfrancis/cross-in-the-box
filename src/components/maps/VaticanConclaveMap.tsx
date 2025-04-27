import { SvgLoader, SvgProxy } from 'react-svgmt';
import { memo } from 'react';
var seedrandom = require('seedrandom');

const VaticanConclaveMap = memo(function VaticanConclaveMap( 
    { electors, seed = "", elected = false, hoverFun = () => {} } : 
    { 
        electors : number,
        seed? : string,
        elected? : boolean,
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void
    }
){
    const origin = [40, 185];
    const minSize = 25;
    const maxSize = 25;
    const farthestPoint = [240 - maxSize, 240 - maxSize];

    const random = new seedrandom(seed);

    return ( <>
        <SvgLoader path="/maps/Vatican.svg">

            <SvgProxy
                selector={'g[name="smoke-group"]'}
                fill={elected ? "#FFF" : "#000"}
                stroke={elected ? "#000" : "#FFF"}
                onElementSelected={(g: SVGGElement) => {
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
                        rect.addEventListener('mousemove', (event) => { hoverFun(true, event) } );
                        rect.addEventListener('mouseout', () => { hoverFun(false) } );
                        g.appendChild(rect);
                    };
                }}
            />

        </SvgLoader>
    </> )
});

export default VaticanConclaveMap;
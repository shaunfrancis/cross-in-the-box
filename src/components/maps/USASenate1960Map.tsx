import { useEffect, useRef } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';

export default function USASenate1960Map( 
    { classNo, specialNames = [], fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        classNo : 1 | 2 | 3,
        specialNames?: string[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){

    const map = useRef(null), cachedSpecialNames = useRef<string[]>([]);

    const addSpecials = (svg : any) => {
        specialNames.forEach( specialName => {
            const rect = svg.querySelector(`[name="${specialName}"]`);
            if(!rect) return;

            const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const x = rect.getAttributeNS(null, "x"), y = rect.getAttributeNS(null, "y");
            star.setAttribute('d', `M${x} ${y}m25 32.5l 8.817 6.135l -3.111 -10.281l 8.56 -6.489l -10.739 -0.219l -3.527 -10.146l -3.527 10.146l -10.739 0.219l 8.56 6.489l -3.111 10.281l 8.817 -6.135`);
            svg.appendChild(star);
        });
    };
    const areEqual = ( a : string[], b : string[] ) => {
        return a.length === b.length && a.every( name => b.includes(name) );
    };
    useEffect( () => {
        if(map.current && !areEqual(specialNames, cachedSpecialNames.current)) addSpecials(map.current);
        cachedSpecialNames.current = specialNames;
    }, [specialNames]);

    return (
        <SvgLoader 
            path={`/maps/USA-senate-1960-C${classNo}.svg`}
            onSVGReady={(svg) => map.current = svg}
        >
            {
                fills.map( (fill, index) => {
                    return (
                        <SvgProxy 
                            key={index} 
                            selector={`[name="${fill.id}"]`} 
                            onMouseMove={(event) => { hoverFun(true, event, fill.id) }} 
                            onMouseOut={() => { hoverFun(false) }}
                            onClick={() => {clickFun(fill.id)}}
                            fill={fill.color}
                            style={fill.opacity !== undefined ? "opacity:" + fill.opacity : ""}
                        />
                    )
                })
            }
        </SvgLoader>
    )
}
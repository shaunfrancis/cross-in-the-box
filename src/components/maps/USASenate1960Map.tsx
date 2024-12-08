import { useEffect, useRef } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { USASeatsToWatch } from 'src/constants/USA';
import { Region } from 'src/Types';

export default function USASenate1960Map( 
    { classNo, specialNames = [], regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        classNo : 1 | 2 | 3,
        specialNames?: string[],
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    const map = useRef(null), cachedStars = useRef<SVGPathElement[]>([]);

    const addStars = (svg : any) => {
        specialNames.forEach( specialName => {
            const exists = cachedStars.current.find( star => star.getAttributeNS(null,'data-name') === specialName);
            if(exists){
                svg.appendChild(exists);
                return;
            }

            const rect = svg.querySelector(`[name="${specialName}"]`);
            if(!rect) return;

            const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const x = rect.getAttributeNS(null, "x"), y = rect.getAttributeNS(null, "y");
            star.setAttribute('data-name', specialName);
            star.setAttribute('d', `M${x} ${y}m25 32.5l 8.817 6.135l -3.111 -10.281l 8.56 -6.489l -10.739 -0.219l -3.527 -10.146l -3.527 10.146l -10.739 0.219l 8.56 6.489l -3.111 10.281l 8.817 -6.135`);
            svg.appendChild(star);
            cachedStars.current.push(star);
        });
    };

    useEffect(() => { if(map.current) addStars(map.current) }, [specialNames]);

    return (
        <SvgLoader 
            path={`/maps/USA-senate-1960-C${classNo}.svg`}
            onSVGReady={(svg) => { map.current = svg; addStars(svg) }}
        >
            {
                regions.map( (region, index) => {
                    let fill = fills.find( f => f.id === region.id );
                    if(!fill){
                        if(USASeatsToWatch.find( s => s.id == region.id)) fill = {id: region.id, color: "url(#highlight_no_result)"};
                        else fill = {id: region.id, color: "url(#no_result)"};
                    }
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
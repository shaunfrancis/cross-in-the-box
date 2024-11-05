import { useEffect, useRef } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';

export default function USASenate1960GeographicMap( 
    { regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        regions: Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    const map = useRef(null), cachedPatterns = useRef<SVGLinearGradientElement[]>([]);
    const diagonalPatterns : SVGLinearGradientElement[] = [];
    
    const proxies = regions.map( (region, index) => {
        const classlessId = region.id.replace(/[1-3]/g, "");
        const classlessFills = fills.filter( f => f.id.replace(/[1-3]/g, "") === classlessId );

        multipleFills: if(classlessFills.length > 1){ //make diagonal pattern for two results in one
            let stop1 = classlessFills[0].color, stop2 = classlessFills[1].color;
            if(stop1.includes("url")) stop1 = "#eee";
            if(stop2.includes("url")) stop2 = "#eee";

            if(stop1 == stop2) break multipleFills;

            const patternId = stop1.replace(/[\#\(\)\,]/g, "_") + "_" + stop2.replace(/[\#\(\)\,]/g, "_");

            classlessFills.splice(0,0,{ id: classlessFills[0].id, color: "url(#diagonal_pattern_" + patternId + ")"});

            const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            linearGradient.setAttribute('id', "diagonal_pattern_" + patternId);
            linearGradient.setAttribute('data-name', patternId);
            linearGradient.setAttributeNS(null, 'gradientTransform', "rotate(-135)");
            linearGradient.setAttributeNS(null, 'spreadMethod', "repeat");
            for(let i = 0; i <= 7; i++){
                const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop.setAttributeNS(null, 'stop-color', [0,3,4].includes(i) ? stop1 : stop2);
                stop.setAttributeNS(null, 'offset', (Math.floor(i/2) + 1) * 25 + "%");
                linearGradient.appendChild(stop);
            }
            diagonalPatterns.push(linearGradient);
        }

        if(classlessFills.length > 0){
            const color = classlessFills[0].color;
            const opacity = classlessFills[0].opacity;
            return (
                <SvgProxy 
                    key={index} 
                    selector={`[name="${classlessId}"]`} 
                    onMouseMove={(event) => { hoverFun(true, event, classlessId) }} 
                    onMouseOut={() => { hoverFun(false) }}
                    onClick={() => { clickFun(classlessId) }}
                    fill={color}
                    style={opacity !== undefined ? "opacity:" + opacity : ""}
                />
            )
        }
        else return (
            <SvgProxy 
                key={index} 
                selector={`[name="${classlessId}"]`} 
                onMouseMove={(event) => { hoverFun(true, event, classlessId) }} 
                onMouseOut={() => { hoverFun(false) }}
                style={"cursor:default"}
            />
        )
    });

    const appendPatterns = (svg : any) => {
        diagonalPatterns.forEach( pattern => {
            const exists = (cachedPatterns.current.find( p => p.getAttribute("data-name") == pattern.getAttribute("data-name") ));
            if(exists){
                svg.appendChild(exists);
                return;
            }
            svg.appendChild(pattern);
            cachedPatterns.current.push(pattern);
        });
    };
    useEffect(() => { if(map.current) appendPatterns(map.current) }, [regions, fills]);

    return (
        <SvgLoader 
            path={`/maps/USA-senate-1960-geographic.svg`}
            onSVGReady={(svg) => { map.current = svg; appendPatterns(svg) }}
        >
            {proxies}
        </SvgLoader>
    )
}
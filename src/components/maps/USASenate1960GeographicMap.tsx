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

    return (
        <SvgLoader 
            path={`/maps/USA-senate-1960-geographic.svg`}
        >
            {
                regions.map( (region, index) => {
                    const classlessId = region.id.replace(/[1-3]/g, "");
                    const classlessFills = fills.filter( f => f.id.replace(/[1-3]/g, "") === classlessId );
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
                })
            }
        </SvgLoader>
    )
}
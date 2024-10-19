import { SvgLoader, SvgProxy } from 'react-svgmt';

export default function USASenate1960GeographicMap( 
    { fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
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
                fills.map( (fill, index) => {
                    const classlessId = fill.id.replace(/[0-9]/g, "");
                    return (
                        <SvgProxy 
                            key={index} 
                            selector={`[name="${classlessId}"]`} 
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
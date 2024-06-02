import { SvgLoader, SvgProxy } from 'react-svgmt';

export default function UKGeneral2024GeographicMap( 
    { fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return (
        <SvgLoader path="/maps/UK-2010-geographic.svg">
            {
                fills.map( (fill, index) => {
                    return (
                        <SvgProxy 
                            key={index} 
                            selector={'[name="' + fill.id + '"]'} 
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
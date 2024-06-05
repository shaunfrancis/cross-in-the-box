import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';

export default function UKGeneral2024Map( 
    { regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return (
        <SvgLoader path="/maps/UK-2024.svg">
            {
                regions.map( (region, index) => {
                    const fill = fills.find( f => f.id == region.id ) || {id: region.id, color: "url(#no_result)"};
                    
                    return (
                        <SvgProxy 
                            key={index} 
                            selector={'rect[name="' + region.id + '"]'} 
                            onMouseMove={(event) => { hoverFun(true, event, region.id) }} 
                            onMouseOut={() => { hoverFun(false) }}
                            onClick={() => {clickFun(region.id)}}
                            fill={fill.color}
                            style={fill.opacity !== undefined ? "opacity:" + fill.opacity : ""}
                        />
                    )
                })
            }
        </SvgLoader>
    )
}
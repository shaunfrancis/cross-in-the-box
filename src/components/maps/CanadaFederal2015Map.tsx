import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';

export default function CanadaFederal2015Map( 
    { regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return (
        <SvgLoader path="/maps/Canada-2015.svg">
            {
                regions.map( (region, index) => {
                    let fill = fills.find(f => f.id == region.id);
                    if(!fill) fill = {id: region.id, color: "#eee"};
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
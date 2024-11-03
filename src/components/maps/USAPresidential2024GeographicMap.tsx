import { SvgLoader, SvgProxy } from 'react-svgmt';
import { USASeatsToWatch } from 'src/constants/USA';
import { Region } from 'src/Types';

export default function USAPresidential2024GeographicMap( 
    { regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return ( <>
        <SvgLoader path="/maps/USA-presidential-2024-geographic.svg">
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
    </> )
}
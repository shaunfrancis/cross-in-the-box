import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';

export default function USAHouseMapGeographic( 
    { year, regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        year : string,
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return (
        <SvgLoader path={"/maps/USA-house-" + year + "-geographic.svg"}>
            {
                regions.map( (region, index) => {
                    const fill = fills.find( fill => fill.id === region.id );
                    if(fill) return (
                        <SvgProxy 
                            key={index} 
                            selector={'[name="' + region.id + '"]'} 
                            onMouseMove={(event) => { hoverFun(true, event, region.id) }} 
                            onMouseOut={() => { hoverFun(false) }}
                            onClick={() => {clickFun(region.id)}}
                            fill={fill.color}
                            style={fill.opacity !== undefined ? "opacity:" + fill.opacity : ""}
                        />
                    );
                    else return (
                        <SvgProxy 
                            key={index} 
                            selector={'[name="' + region.id + '"]'} 
                            onMouseMove={(event) => { hoverFun(true, event, region.id) }} 
                            onMouseOut={() => { hoverFun(false) }}
                            onClick={() => {clickFun(region.id)}}
                        />
                    );
                })
            }
        </SvgLoader>
    )
}
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';

export default function USAHouseMap( 
    { year, regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        year : string,
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){

    //mid-decade redistricting should use same cartographic map
    let baseYear = year;
    switch(year){
        case "2020": case "2018": case "2016": 
            baseYear = "2012"; break;
    }

    const replaceYear = (svg : SVGElement) => {
        const replaces : {state : string, from : string, to : string}[] = [];

        switch(year){
            case "2020":
                replaces.push({state: "NC", from: "2012", to: "2020"});
            case "2018":
                replaces.push({state: "PA", from: "2012", to: "2018"});
            case "2016":
                replaces.push({state: "FL", from: "2012", to: "2016"});
                replaces.push({state: "VA", from: "2012", to: "2016"});
                year != "2020" && replaces.push({state: "NC", from: "2012", to: "2016"});
                break;
        }

        replaces.forEach( replace => {
            svg.querySelectorAll('[name^="' + replace.from + replace.state + '"]').forEach( path => {
                const district = path.getAttribute('name')!.substring(6, 8);
                path.setAttribute('name', replace.to + replace.state + district);
            });
        } );
        
    };

    return (
        <SvgLoader path={"/maps/USA-house-" + baseYear + ".svg"} onSVGReady={(svg : SVGElement) => { replaceYear(svg) }}>
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
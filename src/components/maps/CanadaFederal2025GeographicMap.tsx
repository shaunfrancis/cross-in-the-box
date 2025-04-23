import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';
import styles from './styles.module.css';

export default function CanadaFederal2025GeographicMap( 
    { regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return ( <>
        <SvgLoader path="/maps/Canada-2025-geographic.svg">
            {
                regions.map( (region, index) => {
                    let fill = fills.find(f => f.id == region.id);
                    if(!fill) fill = {id: region.id, color: "#eee"};
                    
                    return (
                        <SvgProxy 
                            key={index} 
                            selector={'[name="' + region.id + '"]'} 
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
        <p className={styles["attribution"]}>Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Canada_Election_2025_Results_Map.svg">File:Canada Election 2025 Results Map.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license. Contains data from the 2022 Federal Redistribution Commissions, Statistics Canada and OpenStreetMap and its contributors.</p>
    </> )
}
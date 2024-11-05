import { SvgLoader, SvgProxy } from 'react-svgmt';
import { Region } from 'src/Types';
import styles from './styles.module.css';
import { UKSeatsToWatch } from 'src/constants/UK';

export default function UKGeneral2024GeographicMap( 
    { regions, fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        regions : Region[],
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return ( <>
        <SvgLoader path="/maps/UK-2024-geographic.svg">
            {
                regions.map( (region, index) => {
                    let fill = fills.find(f => f.id == region.id);
                    if(!fill){
                        if(UKSeatsToWatch.find( s => s.id == region.id)) fill = {id: region.id, color: "url(#highlight_no_result)"};
                        else fill = {id: region.id, color: "url(#no_result)"};
                    }
                    
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
        <p className={styles["attribution"]}>Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:UK_House_of_Commons_constituencies_2023.svg">File:UK House of Commons constituencies 2023.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license. Contains public sector information licensed under the <a target="_blank" href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0.</a></p>
    </> )
}
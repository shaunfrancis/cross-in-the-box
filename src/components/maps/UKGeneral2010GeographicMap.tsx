import { SvgLoader, SvgProxy } from 'react-svgmt';
import styles from './styles.module.css';

export default function UKGeneral2010GeographicMap( 
    { fills = [], hoverFun = () => {}, clickFun = () => {} } : 
    { 
        fills? : {id : string, color : string, opacity? : number}[],
        hoverFun? : (active?: boolean, event?: React.MouseEvent, id?: string) => void,
        clickFun? : (id?: string) => void
    }
){
    return ( <>
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
        <p className={styles["attribution"]}>Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:2017UKElectionMap.svg">File:2017UKElectionMap.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license.</p>
    </> )
}
import { useEffect, useRef, useState } from 'react';
import styles from './HoverPopup.module.css';

export default function ElectionResultPopup( 
    { visible, coordinates, children } : { visible : boolean, coordinates : [number,number], children: React.ReactNode }
){
    
    const popupRef = useRef<HTMLDivElement>(null);
    const [offscreenOffsets, setOffscreenOffsets] = useState<[number,number]>([0,0]);

    useEffect( () => {
        if(popupRef.current){
            const width = popupRef.current.offsetWidth;
            const height = popupRef.current.offsetHeight;

            const newOffsets : [number,number] = [0,0];
            if(coordinates[0] + 20 + width > window.innerWidth) newOffsets[0] = -(width + 40);
            if(coordinates[1] + 20 + height > window.innerHeight) newOffsets[1] = window.innerHeight - height - 20 - coordinates[1];

            setOffscreenOffsets(newOffsets);
        }
    }, [coordinates]);

    return ( visible &&
        <div ref={popupRef} id={styles["container"]} style={
            {
                left: coordinates[0] + offscreenOffsets[0] + 20 + "px",
                top: coordinates[1] + offscreenOffsets[1] + 20 + "px"
            }
        }>
            {children}
        </div>
    )
}
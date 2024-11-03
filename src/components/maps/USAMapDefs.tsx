export default function USAMapDefs(){
    return(
        <svg style={{position:"absolute",top:"0",pointerEvents:"none",zIndex:"-1"}}>
            <defs>
                <pattern id="no_result" patternUnits="userSpaceOnUse" width="10.4" height="10.4">
                    <g fill="rgb(207,207,207)" stroke="none">
                        <rect x="-3.1" y="-3.1" width="5.2" height="5.2"/>
                        <rect x="7.3" y="-3.1" width="5.2" height="5.2" />
                        <rect x="2.1" y="2.1" width="5.2" height="5.2" />
                        <rect x="-3.1" y="7.3" width="5.2" height="5.2"/>
                        <rect x="7.3" y="7.3" width="5.2" height="5.2" />
                    </g>
                </pattern>
                <pattern id="highlight_no_result" patternUnits="userSpaceOnUse" width="10.4" height="10.4">
                    <g fill="rgb(100,100,100)" stroke="none">
                        <rect x="-3.1" y="-3.1" width="5.2" height="5.2"/>
                        <rect x="7.3" y="-3.1" width="5.2" height="5.2" />
                        <rect x="2.1" y="2.1" width="5.2" height="5.2" />
                        <rect x="-3.1" y="7.3" width="5.2" height="5.2"/>
                        <rect x="7.3" y="7.3" width="5.2" height="5.2" />
                    </g>
                </pattern>
            </defs>
        </svg>
    )
}
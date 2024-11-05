export default function USAMapDefs(){
    return(
        <svg style={{position:"absolute",top:"0",pointerEvents:"none",zIndex:"-1"}}>
            <defs>
                <linearGradient id="no_result" gradientTransform="rotate(45)">
                    <stop stopColor="#EEE" offset="0%" />
                    <stop stopColor="#DDD" offset="100%" />
                </linearGradient>
                <linearGradient id="highlight_no_result" gradientTransform="rotate(45)">
                    <stop stopColor="#CCC" offset="0%" />
                    <stop stopColor="#BBB" offset="100%" />
                </linearGradient>
            </defs>
        </svg>
    )
}
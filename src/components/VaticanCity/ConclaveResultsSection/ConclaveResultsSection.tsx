'use client';

import { useState } from "react";
import { Party, Region } from "src/Types";
import ConclaveResultContainer from "./ConclaveResultContainer/ConclaveResultContainer";

export default function ConclaveResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    
    return ( <>
        <div style={{marginInline:"var(--left-gap)"}}>
            <ConclaveResultContainer election="2010"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic} 
            />
        </div>
    </> )
}
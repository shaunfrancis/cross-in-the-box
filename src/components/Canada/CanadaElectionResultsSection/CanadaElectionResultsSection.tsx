'use client';

import { useState } from "react";
import { Party, Region } from "src/Types";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import CanadaElectionResultContainer from "./CanadaElectionResultContainer/CanadaElectionResultContainer";

export default function CanadaElectionResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    
    return ( <>
        <ElectionResultsSection>
            <CanadaElectionResultContainer election="2021"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <CanadaElectionResultContainer election="2019"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <CanadaElectionResultContainer election="2015"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />
        </ElectionResultsSection>
    </> )
}
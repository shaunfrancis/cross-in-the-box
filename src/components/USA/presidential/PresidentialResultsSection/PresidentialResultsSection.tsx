'use client';

import { useState } from "react";
import { Party, Region, Result } from "src/Types";

import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import PresidentialResultContainer from "./PresidentialResultContainer/PresidentialResultContainer";

export default function PresidentialResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);

    return ( <>
        <ElectionResultsSection>

            <PresidentialResultContainer election="P2020" messageGroup="P2020" messagesOpenOnLoad={true}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <PresidentialResultContainer election="P2016" messageGroup="P2016"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

        </ElectionResultsSection>
    </> )
}
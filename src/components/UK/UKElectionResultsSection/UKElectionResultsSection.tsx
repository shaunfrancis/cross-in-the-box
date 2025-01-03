'use client';

import { useState } from "react";
import UKElectionResultContainer from "./UKElectionResultContainer/UKElectionResultContainer";
import { Party, Region } from "src/Types";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";

export default function UKElectionResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);
    
    return ( <>
        <ElectionResultsSection>
            <UKElectionResultContainer election="2024" messageGroup="2024" messagesOpenOnLoad={true}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            {/*<UKElectionResultContainer live={true} election="2024" messageGroup="2024" messagesOpenOnLoad={true}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />*/}

            {/*<UKElectionResultContainer election="2019" title={["Today"]} changes={true} messageGroup="2019U" messagesOpenOnLoad={true}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic} />*/}
            
            <UKElectionResultContainer election="2019" messageGroup="2019"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2017" messageGroup="2017"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2015"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2010"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                geographic={geographic} 
            />
        </ElectionResultsSection>
    </> )
}
'use client';

import { Party, Region, Result, ResultsContext } from "src/Types";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import GovernorResultContainer from "./GovernorResultContainer/GovernorResultContainer";
import { Context, createContext, useRef } from "react";
import { governorGhostResults } from "src/constants/USA";
import { useLiveCloseAndCountedData } from "src/lib/USA-client.tsx";


export default function GovernorResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){

    const resultsContext = useRef<Context<ResultsContext>>();
    if(!resultsContext.current){
        resultsContext.current = createContext<ResultsContext>( { bank: [...governorGhostResults], promises: [] } );
    }
    
    const liveCloseAndCountedData = useLiveCloseAndCountedData();

    return ( <>
        <ElectionResultsSection>
        
            <GovernorResultContainer context={resultsContext.current} 
                election="G2024" messageGroup="2024" messagesOpenOnLoad={true} live={false}
                regions={regions}
                parties={parties}
                geographic={geographic}
                liveCloseAndCountedData={liveCloseAndCountedData}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2023"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2022"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2021"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2020" messageGroup="2020"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2019"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2018" messageGroup="2018"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2017"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer context={resultsContext.current} 
                election="G2016"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            {/* <GovernorResultContainer election="H2016"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <GovernorResultContainer election="H2014"
                regions={regions}
                parties={parties}
                geographic={geographic}
            /> */}

        </ElectionResultsSection>
    </> )
}
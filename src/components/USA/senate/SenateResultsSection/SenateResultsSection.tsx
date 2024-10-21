'use client';

import { Party, Region, Result } from "src/Types";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import SenateResultContainer from "./SenateResultContainer/SenateResultContainer";
import { Context, createContext, useRef } from "react";
import { senateGhostResults } from "src/constants/USA";

interface ResultsContext{
    bank : {
        election : string,
        date : Date,
        results : Result[]
    }[],
    promises : {
        election : string,
        promise : Promise<Result[]>
    }[]
}

export default function SenateResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){

    const resultsContext = useRef<Context<ResultsContext>>();
    if(!resultsContext.current){
        resultsContext.current = createContext<ResultsContext>( { bank: [...senateGhostResults], promises: [] } );
    }

    return ( <>
        <ElectionResultsSection>

            {/* <SenateResultContainer context={resultsContext} 
                election="S2022" classNo={3}
                regions={regions}
                parties={parties}
                geographic={geographic}
            /> */}

            <SenateResultContainer context={resultsContext.current} 
                election="S2020" classNo={2} messageGroup="P2020" messagesOpenOnLoad={true}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <SenateResultContainer context={resultsContext.current}
                election="S2018" classNo={1} messageGroup="S2018"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <SenateResultContainer context={resultsContext.current}
                election="S2016" classNo={3}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <SenateResultContainer context={resultsContext.current}
                election="S2014" classNo={2}
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

        </ElectionResultsSection>
    </> )
}
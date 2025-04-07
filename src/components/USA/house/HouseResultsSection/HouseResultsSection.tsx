'use client';

import { Party, Region } from "src/Types";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import HouseResultContainer from "./HouseResultContainer/HouseResultContainer";
import { useLiveCloseAndCountedData } from "src/lib/USA-client.tsx";

export default function HouseResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){

    const liveCloseAndCountedData = useLiveCloseAndCountedData();

    return ( <>
        <ElectionResultsSection>

            <HouseResultContainer election="H2024" messageGroup="2024" messagesOpenOnLoad={true} live={false}
                regions={regions}
                parties={parties}
                geographic={geographic}
                liveCloseAndCountedData={liveCloseAndCountedData}
            />

            <HouseResultContainer election="H2022"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <HouseResultContainer election="H2020" messageGroup="2020"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <HouseResultContainer election="H2018" messageGroup="2018"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <HouseResultContainer election="H2016"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

            <HouseResultContainer election="H2014"
                regions={regions}
                parties={parties}
                geographic={geographic}
            />

        </ElectionResultsSection>
    </> )
}
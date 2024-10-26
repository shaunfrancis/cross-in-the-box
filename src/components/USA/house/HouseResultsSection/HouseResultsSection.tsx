'use client';

import { Party, Region } from "src/Types";
import ElectionResultsSection from "src/components/shared/ElectionResultsSection/ElectionResultsSection";
import HouseResultContainer from "./HouseResultContainer/HouseResultContainer";

export default function HouseResultsSection({ regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){

    return ( <>
        <ElectionResultsSection>

            {/* <HouseResultContainer election="P2024" messageGroup="P2024"
                regions={regions}
                parties={parties}
                geographic={geographic}
            /> */}

            <HouseResultContainer election="H2020" messageGroup="P2020"
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
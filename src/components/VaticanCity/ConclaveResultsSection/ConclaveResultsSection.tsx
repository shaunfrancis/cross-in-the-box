import { Party, Region } from "src/Types";
import ConclaveResultContainer from "./ConclaveResultContainer/ConclaveResultContainer";

export default function ConclaveResultsSection({ regions, parties } : 
    { regions : Region[], parties : Party[] }
){
    
    return ( 
        <div style={{display:"flex", flexDirection:"column", gap: "40px"}}>
            <div style={{marginInline:"var(--left-gap)"}}>
                <ConclaveResultContainer election="2025"
                    regions={regions}
                    parties={parties} 
                />
            </div>

            <div style={{marginInline:"var(--left-gap)"}}>
                <ConclaveResultContainer election="2013"
                    regions={regions}
                    parties={parties} 
                />
            </div>

            <div style={{marginInline:"var(--left-gap)"}}>
                <ConclaveResultContainer election="2005"
                    regions={regions}
                    parties={parties} 
                />
            </div>

            <div style={{marginInline:"var(--left-gap)"}}>
                <ConclaveResultContainer election="1978-10"
                    title={["Oct 1978", "Papal", "Conclave"]}
                    regions={regions}
                    parties={parties} 
                />
            </div>

            <div style={{marginInline:"var(--left-gap)"}}>
                <ConclaveResultContainer election="1978-08"
                    title={["Aug 1978", "Papal", "Conclave"]}
                    regions={regions}
                    parties={parties} 
                />
            </div>

            <div style={{marginInline:"var(--left-gap)"}}>
                <ConclaveResultContainer election="1963"
                    regions={regions}
                    parties={parties} 
                />
            </div>
        </div>
    )
}
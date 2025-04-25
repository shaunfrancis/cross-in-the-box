import MapCard from "src/components/shared/MapCard/MapCard";
import MapCardGroup from "src/components/shared/MapCardGroup/MapCardGroup";

export default function Canada(){
    
    return ( 
        <main>
            <section id="hero">
                <h1>Canada Elections</h1>
            </section>

            <MapCardGroup>
                <MapCard title="Federal Elections" href="federal-elections" src="/maps/Canada-2025.svg" />
            </MapCardGroup>
        </main>
    )
}
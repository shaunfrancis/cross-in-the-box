import MapCard from "src/components/shared/MapCard/MapCard";
import MapCardGroup from "src/components/shared/MapCardGroup/MapCardGroup";

export default function VaticanCity(){
    
    return ( 
        <main>
            <section id="hero">
                <h1>Vatican City Elections</h1>
            </section>

            <MapCardGroup>
                <MapCard title="Papal Conclaves" href="papal-conclaves" src="/maps/UK-2024.svg" />
            </MapCardGroup>
        </main>
    )
}
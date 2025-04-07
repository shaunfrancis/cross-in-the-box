import MapCard from "src/components/shared/MapCard/MapCard";
import MapCardGroup from "src/components/shared/MapCardGroup/MapCardGroup";

export default function USA(){
    
    return ( 
        <main>
            <section id="hero">
                <h1>US Elections</h1>
            </section>

            <MapCardGroup>
                <MapCard title="Presidential" href="presidential-elections" src="/maps/USA-presidential-2024.svg" />
                <MapCard title="Senate" href="senate-elections" src="/maps/USA-senate-1960-C1.svg" />
                <MapCard title="House" href="house-elections" src="/maps/USA-house-2022.svg" />
                <MapCard title="Gubernatorial" href="gubernatorial-elections" src="/maps/USA-gubernatorial-1960.svg" />
            </MapCardGroup>
        </main>
    )
}
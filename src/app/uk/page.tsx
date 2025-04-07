import MapCard from "src/components/shared/MapCard/MapCard";
import MapCardGroup from "src/components/shared/MapCardGroup/MapCardGroup";

export default function UK(){
    
    return ( 
        <main>
            <section id="hero">
                <h1>UK Elections</h1>
            </section>

            <MapCardGroup>
                <MapCard title="General Elections" href="general-elections" src="/maps/UK-2024.svg" />
                <MapCard title="Scottish Parliament" href="https://politics.tennessine.co.uk/uk/scottish-parliament-elections/constituency/citb/" src="/maps/UK-2024.svg" />
                <MapCard title="Senedd Cymru" href="https://politics.tennessine.co.uk/uk/senedd-cymru-elections/constituency/citb/" src="/maps/UK-2024.svg" />
            </MapCardGroup>
        </main>
    )
}
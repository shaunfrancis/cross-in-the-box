import style from './CanadaRidingMap.module.css';
import 'ol/ol.css';

import { OSM } from 'ol/source';
import { Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import { useEffect, useState } from 'react';
import { Fill, Stroke, Style } from 'ol/style';

import Zoom from 'ol/control/Zoom.js';
import ZoomToExtent from 'ol/control/ZoomToExtent.js';
import Attribution from 'ol/control/Attribution.js';
import TileLayer from 'ol/layer/Tile';

export default function CanadaRidingMap( { region } : { region : {id? : string, title : string} }){

    const [success, setSuccess] = useState<boolean>(true);
    
    useEffect(() => {
        if(!region.id || region.id.toString().substring(0, 4) !== "2025"){
            return setSuccess(false);
        }

        const geoJsonUrl = `https://maps-cartes.services.geo.ca/server_serveur/rest/services/ELECTIONS/FED_CA_2023_106_en/MapServer/0/query?where=FED_NUM%3D${region.id.toString().substring(4)}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Foot&returnGeometry=true&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=geojson`;

        (async () => {
            // Get the service metadata and GeoJSON source.
            try{
                let geoSource = await fetch(geoJsonUrl).then(response => response.json());
                if(!geoSource?.features) return;
                geoSource = geoSource.features[0];

                const osmLayer = new TileLayer({
                    source: new OSM({
                        attributions: "Source: Government of Canada licensed under the Open Government Licence - Canada; OpenStreetMap contributors."
                    }),
                });

                const constituencySource = new VectorSource({
                    features: new GeoJSON().readFeatures(geoSource, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857',
                      }),
                });
                const constituencyLayer = new VectorLayer({
                    source: constituencySource,
                    style: new Style({
                        stroke: new Stroke({
                        color: 'black',
                        width: 1,
                        }),
                        fill: new Fill({
                            color: 'rgba(220, 220, 245, 0.5)',
                        }),
                    }),
                });
                const constituencyExtent = constituencySource.getExtent();
        
                // Initialize the map object.
                const map = new Map({
                    target: "map",
                    layers: [ osmLayer, constituencyLayer ],
                    controls: [
                        new Zoom(),
                        new ZoomToExtent({ 
                            extent: constituencyExtent,
                            label: "",
                            className: "ol-zoom-extent " + style["zoom-to-extent"]
                        }),
                        new Attribution({
                            label: "©",
                            collapsible: true,
                        })
                    ],
                    view: new View({
                        projection: 'EPSG:3857',
                        minZoom: 1,
                        maxZoom: 15,
                        center: [ 0, 0 ],
                        zoom: 1
                    })
                });
                map.getView().fit(constituencyExtent, { padding: [20,20,20,20] });

                return () => map.setTarget(undefined);
            }
            catch(error){
                setSuccess(false);
            }
        })();
    }, [region]);
        
    return ( success &&
        <section>
            <div style={{height:'300px',width:'100%'}} id="map" />
        </section>
    )
}
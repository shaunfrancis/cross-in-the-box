import style from './UKConstituencyMap.module.css';
import 'ol/ol.css';

import { VectorTile } from 'ol/source';
import { Map, View } from 'ol';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4.js';
import { TileGrid } from 'ol/tilegrid';
import LayerVectorTile from 'ol/layer/VectorTile';
import MVT from 'ol/format/MVT';
import {applyStyle} from 'ol-mapbox-style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import { useEffect, useState } from 'react';
import { Fill, Stroke, Style } from 'ol/style';

import Zoom from 'ol/control/Zoom.js';
import ZoomToExtent from 'ol/control/ZoomToExtent.js';
import Attribution from 'ol/control/Attribution.js';

export default function UKConstituencyMap( { region } : { region : {id? : string, title : string} }){

    const [success, setSuccess] = useState<boolean>(true);
    
    useEffect(() => {
        if(!region.id) return setSuccess(false);

        const publicKey = '95biRMMW8Pj6N4HUQGAGYamNa2f0FKt3';
        const serviceUrl = 'https://api.os.uk/maps/vector/v1/vts';

        proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
        register(proj4);

        (async () => {
            // Get the service metadata and GeoJSON source.
            try{
                const service = await fetch(serviceUrl + '?key=' + publicKey).then(response => response.json());

                const geoSource = await fetch('/geojson/uk/' + region.id + '.json').then(response => response.json());
                if(!geoSource) return;

                // Read the tile grid dimensions from the service metadata.
                const extent = [ service.fullExtent.xmin, service.fullExtent.ymin, service.fullExtent.xmax, service.fullExtent.ymax ];
                const origin = [ service.tileInfo.origin.x, service.tileInfo.origin.y ];
                const resolutions = service.tileInfo.lods.map(l => l.resolution).slice(0, 16);
                const tileSize = service.tileInfo.rows;
                const tiles = service.tiles[0];
    
                // Set the grid pattern options for the vector tile service.
                const tileGrid = new TileGrid({
                    extent,
                    origin,
                    resolutions,
                    tileSize
                });
        
                // Define the vector tile layer.
                const vectorTileLayer = new LayerVectorTile({
                    declutter: true,
                });
        
                // Apply a style function to the vector tile layer (and assign the vector tile source to the layer once complete).
                applyStyle(
                    vectorTileLayer,
                    serviceUrl + '/' + service.defaultStyles + '?key=' + publicKey,
                    '',
                    {
                        resolutions: tileGrid.getResolutions()
                    }
                ).then((e) => {
                    vectorTileLayer.setSource(
                        new VectorTile({
                            format: new MVT(),
                            url: tiles,
                            projection: 'EPSG:27700',
                            tileGrid: tileGrid,
                            attributions: "Source: Office for National Statistics licensed under the Open Government Licence v.3.0. Contains OS data © Crown copyright and database right [2024]"
                        })
                    )
                });

                const constituencySource = new VectorSource({
                    features: new GeoJSON().readFeatures(geoSource),
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
                    layers: [ vectorTileLayer, constituencyLayer ],
                    controls: [
                        new Zoom(),
                        new ZoomToExtent({ 
                            extent: constituencyExtent,
                            label: "",
                            className: "ol-zoom-extent " + style["zoom-to-extent"]
                        }),
                        new Attribution({
                            label: "©"
                        })
                    ],
                    view: new View({
                        projection: 'EPSG:27700',
                        extent: [ -238375.0, 0.0, 900000.0, 1376256.0 ],
                        resolutions: tileGrid.getResolutions(),
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
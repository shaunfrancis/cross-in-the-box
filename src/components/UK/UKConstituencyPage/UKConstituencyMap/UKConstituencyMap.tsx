import { OSM, VectorTile } from 'ol/source';
import { Map, View } from 'ol';
import 'ol/ol.css'; // Import OpenLayers CSS
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4.js';
import { TileGrid } from 'ol/tilegrid';
import LayerVectorTile from 'ol/layer/VectorTile';
import MVT from 'ol/format/MVT';
import {applyStyle} from 'ol-mapbox-style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import { useEffect } from 'react';
import { Fill, Stroke, Style } from 'ol/style';


export default function UKConstituencyMap( { region } : { region : {id? : string, title : string} }){
        useEffect(() => {
            if(!region.id) return;

            const publicKey = '95biRMMW8Pj6N4HUQGAGYamNa2f0FKt3';
            const serviceUrl = 'https://api.os.uk/maps/vector/v1/vts';
    
            proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
            register(proj4);
    
            (async () => {
                // Get the service metadata and GeoJSON source.
                const service = await fetch(serviceUrl + '?key=' + publicKey).then(response => response.json());

                const geoSource = await fetch('/geojson/uk/' + region.id + '.json').then(response => response.json());

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
                    declutter: true
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
                            tileGrid: tileGrid
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
                          color: 'yellow',
                          width: 1,
                        }),
                        fill: new Fill({
                          color: 'rgba(255, 255, 0, 0.5)',
                        }),
                      }),
                  });
        
                // Initialize the map object.
                const map = new Map({
                    target: "map",
                    layers: [ vectorTileLayer, constituencyLayer ],
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
                map.getView().fit(constituencySource.getExtent());

                return () => map.setTarget(undefined);
            })();
        }, [region]);
        
    return (
        <div style={{height:'100%',width:'100%'}} id="map" />
    )
}
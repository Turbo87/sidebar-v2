// CSS imports
import 'ol/ol.css';
import '../css/ol3-sidebar.css';

// JS imports
import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import { transform } from 'ol/proj.js';

var map = new Map({
    layers: [
        new LayerTile({
            source: new SourceOSM()
        })
    ],
    target: 'map',
    view: new View({
        center: transform([7, 51.2], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4,
    })
});

var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'left' });

map.addControl(sidebar);

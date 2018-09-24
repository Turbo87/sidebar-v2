// CSS imports
import 'ol/ol.css';

// JS imports
import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import { transform } from 'ol/proj.js';
import { inherits } from 'ol/util.js';
import Control from 'ol/control/Control';
import { defaults as defaultControls } from 'ol/control.js';

import { Sidebar } from '../js/ol5-sidebar';

/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;

inherits(app.Sidebar, Control);

var map = new Map({
    controls: defaultControls({
        attributionOptions: {
            collapsible: false
        }
    }).extend([
        new app.Sidebar({ element: 'sidebar', position: 'left' })
    ]),
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    target: 'map',
    view: new View({
        center: transform([7, 51.2], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4,
    })
});

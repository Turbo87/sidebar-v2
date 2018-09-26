var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map',
    view: new ol.View({
        center: ol.proj.transform([7, 51.2], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4,
    })
});

var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'left' });

map.addControl(sidebar);

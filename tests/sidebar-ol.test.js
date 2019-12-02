// work around jsdom canvas issue in jest
HTMLCanvasElement.prototype.getContext = jest.fn()

var ol = require('openlayers');
var Sidebar = require('../js/ol3-sidebar');

describe('Simple sidebar object instantiation', function() {
  beforeEach(function() {
    document.body.innerHTML =
      '<div id="sidebar" class="sidebar collapsed">' +
      '  <div class="sidebar-tabs">' +
      '  </div>' +
      '  <div class="sidebar-content">' +
      '  </div>' +
      '</div>' +
      '<div id="map" class="sidebar-map"></div>';
  });

  test('Sidebar object minimal instantiation', function() {
    var sidebar = new ol.control.Sidebar({ element: 'sidebar' });

    expect(sidebar).toBeTruthy();
  });

  test('Sidebar constructor sets position option', function() {
    var sidebar = new ol.control.Sidebar({
      element: 'sidebar',
      position: 'right'
    });

    expect(sidebar._options.position).toBe('right');
  });
});

describe('Check sidebar configurations', function() {
  test('Minimal sidebar structure contains expected elements', function() {
    document.body.innerHTML =
      '<div id="sidebar" class="sidebar collapsed">' +
      '  <div class="sidebar-tabs">' +
      '    <ul>' +
      '      <li>single item</li>' +
      '    </ul>' +
      '  </div>' +
      '  <div class="sidebar-content">' +
      '    <div class="sidebar-pane">' +
      '      <span class="sidebar-close"></span>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div id="map" class="sidebar-map"></div>';
    var sidebar = new ol.control.Sidebar({ element: 'sidebar' });

    expect(sidebar._tabitems.length).toBe(1);
    expect(sidebar._panes.length).toBe(1);
    expect(sidebar._closeButtons.length).toBe(1);
  });
});

describe('Check sidebar API', function() {
  var map, sidebar;

  beforeEach(function() {
    document.body.innerHTML =
      '<div id="sidebar" class="sidebar collapsed">' +
      '  <div class="sidebar-tabs">' +
      '    <ul>' +
      '      <li><a href="#home">Home</a></li>' +
      '    </ul>' +
      '  </div>' +
      '  <div class="sidebar-content">' +
      '    <div class="sidebar-pane">' +
      '      <span class="sidebar-close"></span>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div id="map" class="sidebar-map"></div>';
    map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.transform([7, 51.2], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4
      })
    });
    sidebar = new ol.control.Sidebar({ element: 'sidebar' });
  });

  test('Sidebar control gets added to map', function() {
    var numControlsBefore = map.getControls().getArray().length;
    map.addControl(sidebar);
    var numControlsAfter = map.getControls().getArray().length;

    expect(numControlsAfter - numControlsBefore).toBe(1);
  });

  test('Sidebar is not collapsed when opened', function() {
    map.addControl(sidebar);
    sidebar.open();
    var sidebarDivClass = document.getElementById('sidebar').getAttribute('class');

    expect(sidebarDivClass).not.toContain('collapsed');
  });

  test('Sidebar is collapsed after being closed', function() {
    map.addControl(sidebar);
    var sidebarDivClass = document.getElementById('sidebar').getAttribute('class');

    expect(sidebarDivClass).toContain('collapsed');

    sidebar.open();

    sidebarDivClass = document.getElementById('sidebar').getAttribute('class');
    expect(sidebarDivClass).not.toContain('collapsed');

    sidebar.close();

    sidebarDivClass = document.getElementById('sidebar').getAttribute('class');
    expect(sidebarDivClass).toContain('collapsed');
  });
});

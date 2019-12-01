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

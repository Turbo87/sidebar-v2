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


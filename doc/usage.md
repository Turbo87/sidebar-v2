# sidebar-v2 Documentation

## Installation

### NPM

```
npm install sidebar-v2 --save
```

### CDN hosted

OpenLayers 3+

```HTML
<!-- inside the <head> element -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Turbo87/sidebar-v2@v0.4.0/css/ol3-sidebar.css">
<!-- at the end of the <body> element -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Turbo87/sidebar-v2@v0.4.0/js/ol3-sidebar.js"></script>
```

### Self hosted

Download the [latest release](https://github.com/Turbo87/sidebar-v2/releases/latest),
unpack the downloaded file, and load the CSS and JavaScript into your
document, for instance (OpenLayers 3+):

```HTML
<!-- inside the <head> element -->
<link rel="stylesheet" href="sidebar-v2/css/ol3-sidebar.css">
<!-- at the end of the <body> element -->
<script type="text/javascript" src="sidebar-v2/js/ol3-sidebar.js"></script>
```

## Usage

In your HTML ensure that you have loaded the
[OpenLayers](https://openlayers.org/) and `sidebar-v2` CSS.  In the example
code below we also use [FontAwesome](https://fontawesome.com/) so that nice
symbols can be used for the sidebar's buttons.

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.2/css/ol.css" type="text/css">
<link rel="stylesheet" href="sidebar-v2/css/ol3-sidebar.css">

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
```

Then create the `div` element within the HTML `body` for the map similarly
to how one would for plain OpenLayers maps.  However note that you need to
use `class="sidebar-map"` instead of `class="map"` and the map `div` needs
to *follow* the `div` for the sidebar:

```HTML
<!-- follows sidebar div -->
<div id="map" class="sidebar-map"></div>
```

Now define the sidebar (by default in a collapsed state) via the `sidebar`
and `collapsed` classes:

```HTML
<div id="sidebar" class="sidebar collapsed">
</div>
```

Each sidebar element consists of a navigation tab connected to a tab pane
containing the content of the sidebar element.

The navigation tabs are a simple unordered list of anchors linking to the
respective tab pane:

```HTML
  <!-- navigation tabs -->
  <div class="sidebar-tabs">
    <ul role="tablist">
      <li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>
    </ul>
  </div>
```

The content of a given tab is contained in a sidebar tab pane (note the `id`
attribute pointing back to the relevant navigation tab).  A pane includes a
header (via the `sidebar-header` class), which contains the `span` element
needed to close the pane, and then simple HTML text, for instance `p`
elements:

```HTML
  <!-- tab panes -->
  <div class="sidebar-content">
    <div class="sidebar-pane" id="home">
      <h1 class="sidebar-header">
        Pane header text
        <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
      </h1>

      <p>Pane text</p>
    </div>
  </div>
```

Now that the HTML has been set up, we can add the sidebar to the OpenLayers
map within JavaScript by adding a `script` element at the end of the `body`.

Don't forget to load the OpenLayers and sidebar-v2 JavaScript:

```HTML
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.2/build/ol.js"></script>
<script src="sidebar-v2/js/ol3-sidebar.js"></script>
```

Then set up the OpenLayers map, in this case using an
[OpenStreetMap](https://www.openstreetmap.org/) source:

```HTML
<script>
    var map = new ol.Map({
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
</script>
```

To add the sidebar, simply create a new `Sidebar` object which links to the
sidebar `div` created above, and then add it as a new control to the map:

```javascript
    var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'left' });
    map.addControl(sidebar);
```

Putting it all together we get:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
  <title>sidebar-v2 usage example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
  <link rel="stylesheet" href="sidebar-v2/css/ol3-sidebar.css">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
  </head>

  <body>
    <div id="sidebar" class="sidebar collapsed">
      <!-- navigation tabs -->
      <div class="sidebar-tabs">
        <ul role="tablist">
          <li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>
        </ul>
      </div>

      <!-- tab panes -->
      <div class="sidebar-content">
        <div class="sidebar-pane" id="home">
          <h1 class="sidebar-header">
            Pane header text
            <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
          </h1>

          <p>Pane text</p>
        </div>
      </div>
    </div>

    <div id="map" class="sidebar-map"></div>

    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <script src="sidebar-v2/js/ol3-sidebar.js" type="text/javascript"></script>
    <script>
        var map = new ol.Map({
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

        var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'left' });
        map.addControl(sidebar);
    </script>
  </body>
</html>
```

For a more complete examples, have a look at the files in the `examples/`
directory of the distribution.

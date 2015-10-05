# sidebar-v2

A responsive sidebar for mapping libraries like [Leaflet](#leaflet) or [OpenLayers](#openlayers-3).

It is more or less a successor of the [leaflet-sidebar](https://github.com/turbo87/leaflet-sidebar/) plugin, thus the `v2` suffix.

<a href="https://flattr.com/submit/auto?user_id=turbo&url=https%3A%2F%2Fgithub.com%2FTurbo87%2Fsidebar-v2" target="_blank"><img src="https://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0"></a>

![Demo](doc/sidebar-v2.gif)


## [Leaflet](http://leafletjs.com/)

![Sidebar collapsed](doc/leaflet-1.png) ![Sidebar extended](doc/leaflet-2.png)

Example code at [`examples/index.html`](examples/index.html) ([Preview](http://turbo87.github.io/sidebar-v2/examples/index.html))


## [OpenLayers 3](http://openlayers.org/)

![Sidebar collapsed](doc/ol3-1.png) ![Sidebar extended](doc/ol3-2.png)

Example code at [`examples/ol3.html`](examples/ol3.html) ([Preview](http://turbo87.github.io/sidebar-v2/examples/ol3.html))


## [OpenLayers 2](http://openlayers.org/two/)

![Sidebar collapsed](doc/ol2-1.png) ![Sidebar extended](doc/ol2-2.png)

Example code at [`examples/ol2.html`](examples/ol2.html) ([Preview](http://turbo87.github.io/sidebar-v2/examples/ol2.html))


## [Google Maps](https://developers.google.com/maps/)

![Sidebar collapsed](doc/gmaps-1.png) ![Sidebar extended](doc/gmaps-2.png)

Example code at [`examples/gmaps.html`](examples/gmaps.html) ([Preview](http://turbo87.github.io/sidebar-v2/examples/gmaps.html))


## Usage

### API
sidebar-v2 provides a simple API to dynamically modify the sidebar. All functions may be chained.

#### creation
```js
var sidebar = L.control.sidebar('sidebar').addTo(map); // leaflet version
var sidebar = $('#sidebar').sidebar();                 // jquery version
```

#### modification
currently only available in leaflet :^(
```js
/* add a new panel */
var panelContent = {
    id: 'userinfo',                     // UID, used to access the panel
    tab: '<i class="fa fa-gear"></i>',  // content can be passed as HTML string,
    pane: someDomNode.innerHTML,        // DOM elements can be passed, too
    position: 'bottom'                  // vertical alignment, 'top' or 'bottom'
};
sidebar.addPanel(panelContent);

/* remove a panel */
sidebar.removePanel('userinfo');

/* en- / disable a panel */
sidebar.disablePanel('userinfo');
sidebar.enablePanel('userinfo');
```

#### open / close / show content
```js
/* open a panel */
sidebar.open('userinfo');

/* close the sidebar */
sidebar.close();
```

### markup
If you use the sidebar with static content only, you can predefine content in HTML:

```html
<div id="sidebar" class="sidebar collapsed">
    <!-- Nav tabs -->
    <div class="sidebar-tabs">
        <ul role="tablist"> <!-- top aligned tabs -->
            <li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>
            <li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>
            <li><a href="#profile" role="tab"><i class="fa fa-user"></i></a></li>
        </ul>

        <ul role="tablist"> <!-- bottom aligned tabs -->
            <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
        </ul>
    </div>

    <!-- Tab panes -->
    <div class="sidebar-content">
        <div class="sidebar-pane" id="home">
            <h1 class="sidebar-header">
                sidebar-v2
                <div class="sidebar-close"><i class="fa fa-caret-left"></i></div>
            </h1>
            <p>A responsive sidebar for mapping libraries</p>
        </div>

        <div class="sidebar-pane" id="messages">
            <h1 class="sidebar-header">Messages<div class="sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
        </div>

        <div class="sidebar-pane" id="profile">
            <h1 class="sidebar-header">Profile<div class="sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
        </div>
    </div>
</div>
```

You still need to initialize the sidebar (see API.creation)

### Events

The sidebar fires 3 types of events:
`opening`, `closing`, and `content`.
The latter has a payload including the id of the activated content div.

You can listen for them like this:
```js
sidebar.on('content', function(e) {
    // e.id contains the id of the opened panel
})
```


## License

sidebar-v2 is free software, and may be redistributed under the [MIT license](LICENSE).

L.Control.Sidebar = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        position: 'left'
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar HTMLElement
        this._sidebar = L.DomUtil.get(id);

        // Attach .sidebar-left/right class
        L.DomUtil.addClass(this._sidebar, 'sidebar-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar, 'leaflet-touch');

        // Find sidebar > div.sidebar-content
        for (i = this._sidebar.children.length - 1; i >= 0; i--) {
            child = this._sidebar.children[i];
            if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar-content'))
                this._container = child;
        }

        // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
        this._tabitems = this._sidebar.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            this._tabitems[i]._sidebar = this;
        }

        // Find sidebar > div.sidebar-content > div.sidebar-pane
        this._panes = [];
        this._closeButtons = [];
        for (i = this._container.children.length - 1; i >= 0; i--) {
            child = this._container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar-pane')) {
                this._panes.push(child);

                var closeButtons = child.querySelectorAll('.sidebar-close');
                for (var j = 0, len = closeButtons.length; j < len; j++)
                    this._closeButtons.push(closeButtons[j]);
            }
        }
    },

    addTo: function (map) {
        var i, child;

        this._map = map;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            L.DomEvent
                .on(child.querySelector('a'), 'click', L.DomEvent.preventDefault )
                .on(child.querySelector('a'), 'click', this._onClick, child);
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.on(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    removeFrom: function (map) {
        var i, child;

        this._map = null;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    open: function(id) {
        var i, child
            disabled = this._getDisabledTabs(); //getting list of disabled tabs
            
        for(i = disabled.length-1; i>=0; i--) {
            if(disabled[i].firstChild.hash =='#' + id)
                return this;                        //if the tab is disabled, then do not try to open it.  
        }

        // hide old active contents and show new content
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            if (child.id == id) {   //the ID must match one of the existing tabs to continue, else, return
        
                for (i = this._panes.length - 1; i >= 0; i--) {  
                    if (child.id == id)
                        L.DomUtil.addClass(child, 'active');
                    else if (L.DomUtil.hasClass(child, 'active'))
                        L.DomUtil.removeClass(child, 'active');
                }

                // remove old active highlights and set new highlight
                for (i = this._tabitems.length - 1; i >= 0; i--) {
                    child = this._tabitems[i];
                    if (child.querySelector('a').hash == '#' + id)
                        L.DomUtil.addClass(child, 'active');
                    else if (L.DomUtil.hasClass(child, 'active'))
                        L.DomUtil.removeClass(child, 'active');
                }

                this.fire('content', { id: id });
        
                // open sidebar (if necessary)
                if (L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
                    this.fire('opening');
                    L.DomUtil.removeClass(this._sidebar, 'collapsed');
                }
                return this;
            }
        }
        return this; //if the ID doesn't match any of the tabs, then just return
    },

    close: function() {
        // remove old active highlights
        L.DomUtil.removeClass(this._getActiveTab(), 'active');


        // close sidebar
        if (!L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar, 'collapsed');
        }

        return this;
    },
    
    getActiveTab: function() {
        return this._getActiveTab();
    },
    
    getDisabledTabs: function() {
      return this._getDisabledTabs();  
    },
    
    _getActiveTab: function() {
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
               return child;
        }
    },
    
    _getDisabledTabs: function() {
        var tabs=[];
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var tab = this._tabitems[i],
                child = tab.firstChild;
            if (L.DomUtil.hasClass(child, 'disabled')){
               tabs.push(tab);
            }
        }  
        return tabs; 
    },

    _onClick: function(e) {
        if (L.DomUtil.hasClass(this, 'active'))
            this._sidebar.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            this._sidebar.open(this.querySelector('a').hash.slice(1));
    },

    _onCloseClick: function () {
        this.close();
    }
});

L.control.sidebar = function (sidebar, options) {
    return new L.Control.Sidebar(sidebar, options);
};

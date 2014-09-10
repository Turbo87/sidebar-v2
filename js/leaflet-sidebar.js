L.Control.Sidebar = L.Control.extend({
    includes: L.Mixin.Events,

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar HTMLElement
        this._sidebar = L.DomUtil.get(id);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(sidebar, 'leaflet-touch');

        // Find sidebar > ul.sidebar-tabs and sidebar > div.sidebar-content
        for (i = this._sidebar.children.length - 1; i >= 0; i--) {
            child = this._sidebar.children[i];
            if (child.tagName == 'UL' &&
                    L.DomUtil.hasClass(child, 'sidebar-tabs'))
                this._tabs = child;

            else if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar-content'))
                this._container = child;
        }

        // Find sidebar > ul.sidebar-tabs > li
        this._tabitems = [];
        for (i = this._tabs.children.length - 1; i >= 0; i--) {
            child = this._tabs.children[i];
            if (child.tagName == 'LI') {
                this._tabitems.push(child);
                child._sidebar = this;
            }
        }

        // Find sidebar > div.sidebar-content > div.sidebar-pane
        this._panes = [];
        for (i = this._container.children.length - 1; i >= 0; i--) {
            child = this._container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar-pane'))
                this._panes.push(child);
        }
    },

    addTo: function (map) {
        this._map = map;

        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            L.DomEvent.on(child.firstChild, 'click', this._onClick, child);
        }

        return this;
    },

    removeFrom: function (map) {
        this._map = null;

        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            L.DomEvent.off(child.firstChild, 'click', this._onClick);
        }

        return this;
    },

    _onClick: function(e) {
        var i, child, tab = this;
        var _this = tab._sidebar;

        if (L.DomUtil.hasClass(tab, 'active')) {
            // remove old active highlights
            for (i = _this._tabitems.length - 1; i >= 0; i--) {
                child = _this._tabitems[i];
                if (L.DomUtil.hasClass(child, 'active'))
                    L.DomUtil.removeClass(child, 'active');
            }

            // close sidebar
            L.DomUtil.addClass(_this._sidebar, 'collapsed');

        } else {
            // hide old active contents and show new content
            for (i = _this._panes.length - 1; i >= 0; i--) {
                child = _this._panes[i];
                if ('#' + child.id == tab.firstChild.hash)
                    L.DomUtil.addClass(child, 'active');
                else if (L.DomUtil.hasClass(child, 'active'))
                    L.DomUtil.removeClass(child, 'active');
            }

            // remove old active highlights and set new highlight
            for (i = _this._tabitems.length - 1; i >= 0; i--) {
                child = _this._tabitems[i];
                if (child == tab)
                    L.DomUtil.addClass(child, 'active');
                else if (L.DomUtil.hasClass(child, 'active'))
                    L.DomUtil.removeClass(child, 'active');
            }

            // open sidebar (if necessary)
            if (L.DomUtil.hasClass(_this._sidebar, 'collapsed'))
                L.DomUtil.removeClass(_this._sidebar, 'collapsed');
        }
    }
});

L.control.sidebar = function (sidebar, options) {
    return new L.Control.Sidebar(sidebar, options);
};

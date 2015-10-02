L.Control.Sidebar = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        position: 'left'
    },

    /**
     * Create a new sidebar on this object.
     *
     * @constructor
     * @param {string} id - The id of the sidebar element (without the # character)
     * @param {Object} [options] - Optional options object
     * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
     */
    initialize: function(id, options) {
        var i, child, tabContainers;

        L.setOptions(this, options);

        // Find sidebar HTMLElement, create it if none was found
        this._sidebar = L.DomUtil.get(id);
        if (this._sidebar === null)
        	this._sidebar = L.DomUtil.create('div', 'sidebar collapsed', document.body);

        // Attach .sidebar-left/right class
        L.DomUtil.addClass(this._sidebar, 'sidebar-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar, 'leaflet-touch');

        // Find paneContainer in DOM & store reference
        this._paneContainer = this._sidebar.querySelector('div.sidebar-content');

        // If none is found, create it
        if (this._paneContainer === null)
        	this._paneContainer = L.DomUtil.create('div', 'sidebar-content', this._sidebar);

        // Find tabContainerTop & tabContainerBottom in DOM & store reference
        tabContainers = this._sidebar.querySelectorAll('ul.sidebar-tabs, div.sidebar-tabs > ul');
        this._tabContainerTop    = tabContainers[0] || null;
        this._tabContainerBottom = tabContainers[1] || null;

        // If no container was found, create it
        if (this._tabContainerTop === null) {
            var tabCC = L.DomUtil.create('div', 'sidebar-tabs', this._sidebar);
            this._tabContainerTop = L.DomUtil.create('ul', '', tabCC);
        }
        if (this._tabContainerBottom === null) {
            var tabCC = this._tabContainerTop.parentNode;
            this._tabContainerBottom = L.DomUtil.create('ul', '', tabCC);
        }

        // Store Tabs in Collection for easier iteration
        this._tabitems = [];
        for (i = 0; i < this._tabContainerTop.children.length; i++) {
            child = this._tabContainerTop.children[i];
            child._sidebar = this;
            this._tabitems.push(child);
        }
        for (i = 0; i < this._tabContainerBottom.children.length; i++) {
            child = this._tabContainerBottom.children[i];
            child._sidebar = this;
            this._tabitems.push(child);
        }

        // Store Panes in Collection for easier iteration
        this._panes = [];
        this._closeButtons = [];
        for (i = 0; i < this._paneContainer.children.length; i++) {
            child = this._paneContainer.children[i];
            if (child.tagName === 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar-pane')) {
                this._panes.push(child);

                // Save references to close buttons
                var closeButtons = child.querySelectorAll('.sidebar-close');
                for (var j = 0, len = closeButtons.length; j < len; j++) {
                    this._closeButtons.push(closeButtons[j]);
                }
            }
        }
    },

    /**
     * Add this sidebar to the specified map.
     *
     * @param {L.Map} map
     * @returns {L.Control.Sidebar}
     */
    addTo: function(map) {
        var i, child;

        this._map = map;

        // Add click listeners for tab-buttons
        for (i = 0; i < this._tabitems.length; i++) {
            child = this._tabitems[i];
            L.DomEvent
                .on(child.querySelector('a'), 'click', L.DomEvent.preventDefault)
                .on(child.querySelector('a'), 'click', this._onClick, child);
        }

        // Add click listeners for close-buttons
        for (i = 0; i < this._closeButtons.length; i++) {
            child = this._closeButtons[i];
            L.DomEvent.on(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * Remove this sidebar from the map.
     *
     * @param {L.Map} map
     * @returns {L.Control.Sidebar}
     */
    removeFrom: function(map) {
        var i, child;

        this._map = null;

        // Remove click listeners for tab buttons
        for (i = 0; i < this._tabitems.length - 1; i++) {
            child = this._tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        // Remove click listeners for close buttons
        for (i = 0; this._closeButtons.length; i++) {
            child = this._closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * Open sidebar (if it's closed) and show the specified tab.
     *
     * @param {string} id - The ID of the tab to show (without the # character)
     * @returns {L.Control.Sidebar}
     */
    open: function(id) {
        var i, child;

        // Hide old active contents and show new content
        for (i = 0; i < this._panes.length; i++) {
            child = this._panes[i];
            if (child.id === id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // Remove old active highlights and set new highlight
        for (i = 0; i < this._tabitems.length; i++) {
            child = this._tabitems[i];
            if (child.querySelector('a').hash === '#' + id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        this.fire('content', { id: id });

        // Open sidebar if it's closed
        if (L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this._sidebar, 'collapsed');
        }

        return this;
    },

    /**
     * Close the sidebar (if it's open).
     */
    close: function() {
        var i;

        // Remove old active highlights
        for (i = 0; i < this._tabitems.length; i++) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // close sidebar, if it's opened
        if (!L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar, 'collapsed');
        }

        return this;
    },

    /**
     * Event listener for tab buttons
     * @private
     */
    _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active'))
            this._sidebar.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            this._sidebar.open(this.querySelector('a').hash.slice(1));
    },

    /**
     * Event listener for close buttons
     * @private
     */
    _onCloseClick: function() {
        this.close();
    }
});

/**
 * Create a new sidebar.
 *
 * @example
 * var sidebar = L.control.sidebar('sidebar').addTo(map);
 *
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @returns {L.Control.Sidebar} A new sidebar instance
 */
L.control.sidebar = function(id, options) {
    return new L.Control.Sidebar(id, options);
};

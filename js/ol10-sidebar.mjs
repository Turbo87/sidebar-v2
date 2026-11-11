import Control from 'ol/control/Control';

/* global ol */

var Sidebar = function (settings) {

    var defaults = {
        element: null,
        position: 'left'
    }, i, child;

    var options = Object.assign({}, defaults, settings);

    var self = Reflect.construct(Control, [{
        element: document.getElementById(options.element),
        target: options.target
    }], Sidebar);

    self._options = options;

    // Attach .sidebar-left/right class
    self.element.classList.add('sidebar-' + self._options.position);

    // Find sidebar > div.sidebar-content
    for (i = self.element.children.length - 1; i >= 0; i--) {
        child = self.element.children[i];
        if (child.tagName === 'DIV' &&
                child.classList.contains('sidebar-content')) {
            self._container = child;
        }
    }

    // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
    self._tabitems = self.element.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
    for (i = self._tabitems.length - 1; i >= 0; i--) {
        self._tabitems[i]._sidebar = self;
    }

    // Find sidebar > div.sidebar-content > div.sidebar-pane
    self._panes = [];
    self._closeButtons = [];
    for (i = self._container.children.length - 1; i >= 0; i--) {
        child = self._container.children[i];
        if (child.tagName == 'DIV' &&
                child.classList.contains('sidebar-pane')) {
            self._panes.push(child);

            var closeButtons = child.querySelectorAll('.sidebar-close');
            for (var j = 0, len = closeButtons.length; j < len; j++) {
                self._closeButtons.push(closeButtons[j]);
            }
        }
    }

    return self;
};

Sidebar.prototype = Object.create(Control.prototype);
Sidebar.prototype.constructor = Sidebar;

Sidebar.prototype.setMap = function(map) {
    var i, child;

    for (i = this._tabitems.length - 1; i >= 0; i--) {
        child = this._tabitems[i];
        var sub = child.querySelector('a');
        if (sub.hasAttribute('href') && sub.getAttribute('href').slice(0,1) == '#') {
            sub.onclick = this._onClick.bind(child);
        }
    }

    for (i = this._closeButtons.length - 1; i >= 0; i--) {
        child = this._closeButtons[i];
        child.onclick = this._onCloseClick.bind(this);
    }
};

Sidebar.prototype.open = function(id) {
    var i, child;

    // hide old active contents and show new content
    for (i = this._panes.length - 1; i >= 0; i--) {
        child = this._panes[i];
        if (child.id == id)
            child.classList.add('active');
        else if (child.classList.contains('active'))
            child.classList.remove('active');
    }

    // remove old active highlights and set new highlight
    for (i = this._tabitems.length - 1; i >= 0; i--) {
        child = this._tabitems[i];
        if (child.querySelector('a').hash == '#' + id)
            child.classList.add('active');
        else if (child.classList.contains('active'))
            child.classList.remove('active');
    }

    // open sidebar (if necessary)
    if (this.element.classList.contains('collapsed')) {
        this.element.classList.remove('collapsed');
    }

    return this;
};

Sidebar.prototype.close = function() {
    // remove old active highlights
    for (var i = this._tabitems.length - 1; i >= 0; i--) {
        var child = this._tabitems[i];
        if (child.classList.contains('active'))
            child.classList.remove('active');
    }

    // close sidebar
    if (!this.element.classList.contains('collapsed')) {
        this.element.classList.add('collapsed');
    }

    return this;
};

Sidebar.prototype._onClick = function(evt) {
    evt.preventDefault();
    if (this.classList.contains('active')) {
        this._sidebar.close();
    } else if (!this.classList.contains('disabled')) {
        this._sidebar.open(this.querySelector('a').hash.slice(1));
    }
};

Sidebar.prototype._onCloseClick = function() {
    this.close();
};

export { Sidebar as default };

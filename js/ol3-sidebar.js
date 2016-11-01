ol.control.Sidebar = function (settings) {

    var defaults = {
        element: null,
        position: 'left'
    }, i, child;

    this._options = Object.assign({}, defaults, settings);

    ol.control.Control.call(this, {
        element: document.getElementById(this._options.element),
        target: this._options.target
    });

    // Attach .sidebar-left/right class
    this.element.classList.add('sidebar-' + this._options.position);

    // Find sidebar > div.sidebar-content
    for (i = this.element.children.length - 1; i >= 0; i--) {
        child = this.element.children[i];
        if (child.tagName === 'DIV' &&
                child.classList.contains('sidebar-content')) {
            this._container = child;
        }
    }

    // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
    this._tabitems = this.element.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
    for (i = this._tabitems.length - 1; i >= 0; i--) {
        this._tabitems[i]._sidebar = this;
    }

    // Find sidebar > div.sidebar-content > div.sidebar-pane
    this._panes = [];
    this._closeButtons = [];
    for (i = this._container.children.length - 1; i >= 0; i--) {
        child = this._container.children[i];
        if (child.tagName == 'DIV' &&
                child.classList.contains('sidebar-pane')) {
            this._panes.push(child);

            var closeButtons = child.querySelectorAll('.sidebar-close');
            for (var j = 0, len = closeButtons.length; j < len; j++) {
                this._closeButtons.push(closeButtons[j]);
            }
        }
    }
};

ol.inherits(ol.control.Sidebar, ol.control.Control);

ol.control.Sidebar.prototype.setMap = function(map) {
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

ol.control.Sidebar.prototype.open = function(id) {
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

ol.control.Sidebar.prototype.close = function() {
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

ol.control.Sidebar.prototype._onClick = function() {
    if (this.classList.contains('active')) {
        this._sidebar.close();
    } else if (!this.classList.contains('disabled')) {
        this._sidebar.open(this.querySelector('a').hash.slice(1));
    }
};

ol.control.Sidebar.prototype._onCloseClick = function() {
    this.close();
};

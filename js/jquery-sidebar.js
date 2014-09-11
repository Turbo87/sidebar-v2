$.fn.sidebar = function() {
    var $sidebar = this;
    var $tabs = $sidebar.children('.sidebar-tabs').first();
    var $container = $sidebar.children('.sidebar-content').first();

    $sidebar.find('.sidebar-tabs > li > a').on('click', function() {
        var $tab = $(this).closest('li');

        if ($tab.hasClass('active'))
            $sidebar.close();
        else
            $sidebar.open(this.hash.slice(1), $tab);
    });

    $sidebar.open = function(id, $tab) {
        if (typeof $tab === 'undefined')
            $tab = $tabs.find('li > a[href="#' + id + '"]').parent();

        // hide old active contents
        $container.children('.sidebar-pane.active').removeClass('active');

        // show new content
        $container.children('#' + id).addClass('active');

        // remove old active highlights
        $tabs.children('li.active').removeClass('active');

        // set new highlight
        $tab.addClass('active');

        $sidebar.trigger('content', { 'id': id });

        if ($sidebar.hasClass('collapsed')) {
            // open sidebar
            $sidebar.trigger('opening');
            $sidebar.removeClass('collapsed');
        }
    };

    $sidebar.close = function() {
        // remove old active highlights
        $tabs.children('li.active').removeClass('active');

        if (!$sidebar.hasClass('collapsed')) {
            // close sidebar
            $sidebar.trigger('closing');
            $sidebar.addClass('collapsed');
        }
    };

    return $sidebar;
};

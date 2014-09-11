$.fn.sidebar = function() {
    var $sidebar = this;
    var $tabs = $sidebar.children('.sidebar-tabs').first();
    var $container = $sidebar.children('.sidebar-content').first();

    $sidebar.find('.sidebar-tabs > li > a').on('click', function() {
        var $tab = $(this).closest('li');

        if ($tab.hasClass('active')) {
            $sidebar.close();
        } else {
            // hide old active contents
            $container.children('.sidebar-pane.active').removeClass('active');

            // show new content
            $container.children(this.hash).addClass('active');

            // remove old active highlights
            $tabs.children('li.active').removeClass('active');

            // set new highlight
            $tab.addClass('active');

            if ($sidebar.hasClass('collapsed'))
                // open sidebar
                $sidebar.removeClass('collapsed');
        }
    });

    $sidebar.close = function() {
        // remove old active highlights
        $tabs.children('li.active').removeClass('active');

        // close sidebar
        $sidebar.addClass('collapsed');
    };

    return $sidebar;
};

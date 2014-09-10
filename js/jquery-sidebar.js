$('.sidebar-tabs > li > a').on('click', function(e) {
    var $tab = $(this).closest('li');
    var $sidebar = $tab.closest('.sidebar');
    var $tabs = $sidebar.find('.sidebar-tabs');
    var $container = $sidebar.find('.sidebar-content');

    if ($tab.hasClass('active')) {
        // remove old active highlights
        $tabs.children('li.active').removeClass('active');

        // close sidebar
        $sidebar.addClass('collapsed');

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

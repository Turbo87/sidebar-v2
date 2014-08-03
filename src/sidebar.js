$('.sidebar-tabs > li > a').on('click', function(e) {
    var sidebar = $('.sidebar');
    if (sidebar.hasClass('collapsed'))
        sidebar.removeClass('collapsed');
    else
        sidebar.addClass('collapsed');
});

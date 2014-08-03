$('.sidebar-tabs > li > a').on('click', function(e) {
    var sidebar = $('.sidebar');
    if (sidebar.hasClass('collapsed'))
        sidebar.removeClass('collapsed');
    else
        sidebar.addClass('collapsed');
});

$(function () {
    if (L !== undefined && L.Browser !== undefined && L.Browser.touch)
        $('.sidebar').addClass('leaflet-touch');
});

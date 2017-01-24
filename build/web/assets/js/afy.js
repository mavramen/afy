$(document).ready(function () {
    $("#footer-container").load("footer.html");
    $("#nav-container").load("navigation.html", function () {
        var menu = ['home', 'about', 'community', 'resources', 'shopping', 'contact'];
        $("#top-navbar-ul>li").removeClass("active");
        $.each(menu, function (index, value) {
            //alert(index + ": " + value);
            if ($($('.navbar')).hasClass(value)) {
                $($("#top-navbar-ul>li")[index]).addClass("active");
            }
        });
    });
});
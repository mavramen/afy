
jQuery(document).ready(function () {

    /*
     Wow
     */
    new WOW().init();
    
    /*
     Slider
     */
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        prevText: "",
        nextText: ""
    });

    /*
     Slider 2
     */
    $('.slider-2-container').backstretch([
        "assets/img/slider/5.jpg"
                , "assets/img/slider/6.jpg"
                , "assets/img/slider/7.jpg"
    ], {duration: 3000, fade: 750});

    /*
     Image popup (home latest work)
     */
    $('.view-work').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: 'The image could not be loaded.',
            titleSrc: function (item) {
                return item.el.parent('.work-bottom').siblings('img').attr('alt');
            }
        },
        callbacks: {
            elementParse: function (item) {
                item.src = item.el.attr('href');
            }
        }
    });

    /*
     Flickr feed
     */
    $('.flickr-feed').jflickrfeed({
        limit: 8,
        qstrings: {
            id: '52617155@N08'
        },
        itemTemplate: '<a href="{{link}}" target="_blank" rel="nofollow"><img src="{{image_s}}" alt="{{title}}" /></a>'
    });

    /*
     Google maps
     */
    var position = new google.maps.LatLng(37.759199, -122.469691);
    var mapProp = {
        center: position,
        zoom: 16,
        'disableDefaultUI': true
    };
    $('.map').gmap(mapProp).gmap('addMarker', {
        'position': position,
    });



    /*
     Subscription form
     */
    $('.success-message').hide();
    $('.error-message').hide();

    $('.footer-box-text-subscribe form').submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var postdata = form.serialize();

        $.ajax({
            type: 'POST',
            url: 'assets/subscribe.php',
            data: postdata,
            dataType: 'json',
            success: function (json) {
                if (json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn();
                } else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    form.hide();
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn();
                }
            }
        });
    });

    /*
     Contact form
     */
    $('.contact-form form').submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var nameLabel = form.find('label[for="contact-name"]');
        var emailLabel = form.find('label[for="contact-email"]');
        var messageLabel = form.find('label[for="contact-message"]');

        nameLabel.html('Name');
        emailLabel.html('Email');
        messageLabel.html('Message');

        var postdata = form.serialize();

        $.ajax({
            type: 'POST',
            url: 'assets/sendmail.php',
            data: postdata,
            dataType: 'json',
            success: function (json) {
                if (json.nameMessage != '') {
                    nameLabel.append(' - <span class="violet error-label"> ' + json.nameMessage + '</span>');
                }
                if (json.emailMessage != '') {
                    emailLabel.append(' - <span class="violet error-label"> ' + json.emailMessage + '</span>');
                }
                if (json.messageMessage != '') {
                    messageLabel.append(' - <span class="violet error-label"> ' + json.messageMessage + '</span>');
                }
                if (json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
                    form.fadeOut('fast', function () {
                        form.parent('.contact-form').append('<p><span class="violet">Thanks for contacting us!</span> We will get back to you very soon.</p>');
                    });
                }
            }
        });
    });

});


jQuery(window).load(function () {

    /*
     Portfolio
     */
    $('.portfolio-masonry').masonry({
        columnWidth: '.portfolio-box',
        itemSelector: '.portfolio-box',
        transitionDuration: '0.5s'
    });

    $('.portfolio-filters a').on('click', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $('.portfolio-filters a').removeClass('active');
            var clicked_filter = $(this).attr('class').replace('filter-', '');
            $(this).addClass('active');
            if (clicked_filter != 'all') {
                $('.portfolio-box:not(.' + clicked_filter + ')').css('display', 'none');
                $('.portfolio-box:not(.' + clicked_filter + ')').removeClass('portfolio-box');
                $('.' + clicked_filter).addClass('portfolio-box');
                $('.' + clicked_filter).css('display', 'block');
                $('.portfolio-masonry').masonry();
            } else {
                $('.portfolio-masonry > div').addClass('portfolio-box');
                $('.portfolio-masonry > div').css('display', 'block');
                $('.portfolio-masonry').masonry();
            }
        }
    });

    $(window).on('resize', function () {
        $('.portfolio-masonry').masonry();
    });

    // image popup	
    $('.portfolio-box img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: 'The image could not be loaded.',
            titleSrc: function (item) {
                return item.el.siblings('.portfolio-box-text').find('h3').text();
            }
        },
        callbacks: {
            elementParse: function (item) {
                if (item.el.hasClass('portfolio-video')) {
                    item.type = 'iframe';
                    item.src = item.el.data('portfolio-video');
                } else {
                    item.type = 'image';
                    item.src = item.el.attr('src');
                }
            }
        }
    });

});

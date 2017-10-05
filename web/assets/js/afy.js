var oldURL = "https://72.52.73.152/";  //url for website www.afypa.org
var tourSchoolURL = "https://goo.gl/sLeYW9";
var volunteerBooklet = "assets/docs/VOLUNTEER BOOKLET.pdf";
var CLIENT_ID = '100213111164-v8un5cp1i6r6tesr0cd1gsc4jc6t7evb.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBuW_tArn70PeThSmTIDFNLyfSG_piFKQQ';

$(document).ready(function () {



    /* <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->  */
    //$("head").append('<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries --><!-- WARNING: Respond.js does not work if you view the page via file:// --><!--[if lt IE 9]><script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>//<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script><![endif]-->');

    $("#footer-container").load("footer.html", function () {
        $("#year").text(new Date().getFullYear());
    });

    $("#nav-container").load("navigation.html", function () {
        var menu = ['home', 'about', 'photo', 'community', /*'resources',*/ 'shopping', 'contact'];
        $("#top-navbar-ul>li").removeClass("active");
        $.each(menu, function (index, value) {
            //alert(index + ": " + value);
            if ($($('.navbar')).hasClass(value)) {
                $($("#top-navbar-ul>li")[index]).addClass("active");
            }
        });
    });


});

jQuery.fn.extend({
    loadDonate: function () {
        $("#donation-container").load("callToDonation.html");
    },
    equalHeightFor: function (selectorChild) {
        var diff = 0;
        $(this).each(function (index) {
            if (index > 0) {
                $(this).find(selectorChild).css('height', diff - $(this).innerHeight() + $(this).find(selectorChild).innerHeight() + 'px');
            } else {
                diff = $(this).innerHeight();
            }

        });
    },
    equalHeightMax: function () {
        var max = 0;
        $(this).each(function () {
            var h = $(this).innerHeight();
            if (max < h) {
                max = h;
            }
        });

        $(this).each(function (index) {
            $(this).css('height', max + 'px');
        });

    },
    loadURL: function (location) {
        window.open(location);
        return false;
    },
    listGoogleDocsFiles: function (containerID, dirID) {
        //console.log('listGoogleDocsFiles');
        $(this).listGoogleDocsFilesJSON(dirID, 100, function (response) {
            var files = response.files;
            //console.log(files);
            if (files && files.length > 0) {
                var rows = '<div class="row underline">' +
                        '<div class="col-sm-4 services-full-width-text wow fadeInLeft"><h3>&nbsp;&nbsp;&nbsp;&nbsp;TITLE&nbsp;&nbsp;&nbsp;&nbsp;</h3></div>' +
                        '<div class="col-sm-4 services-full-width-text wow fadeInLeft"><h3>LAST MODIFIED&nbsp;&nbsp;</h3></div>' +
                        '<div class="col-sm-4 services-full-width-text wow fadeInLeft"><h3>MODIFIED BY&nbsp;&nbsp;</h3></div>' +
                        '</div>';
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    rows += '<div class="row underline">' +
                            '<div class="col-sm-4 presentation-container1 wow fadeInLeft"><p><a class="big-link-2 tour link-icon" href="https://drive.google.com/file/d/' + file.id +
                            '/view?usp=drive_web" target="_blank" id="' + file.name + '"></a>&nbsp;&nbsp;&nbsp;&nbsp;' + file.name + '&nbsp;&nbsp;</p></div>' +
                            '<div class="col-sm-4 presentation-container1 wow fadeInLeft"><p>' + $.format.date(file.createdTime, "MMM  d  yyyy") + '&nbsp;&nbsp;</p></div>' +
                            '<div class="col-sm-4 presentation-container1 wow fadeInLeft"><p>' + file.lastModifyingUser.displayName + '&nbsp;&nbsp;</p></div></div>';
                }

                $("#" + containerID).html(rows);

            } else {
                $("#" + containerID).html('No files found.');
            }
        });
    },
    createLinkToNewestFile: function (dirID, hrefID) {
        //console.log("createLinkToNewestFile");
        $(this).listGoogleDocsFilesJSON(dirID, 1, function (response) {
            var files = response.files;
            if (files && files.length > 0) {
                $('#' + hrefID).attr('href', 'https://drive.google.com/file/d/' + files[0].id + '/view?usp=drive_web').attr('target', '_blank');
            }
        });
    },
    listGoogleDocsFilesJSON: function (dirID, numOfFiles, funcResponse) {
        // console.log("listGoogleDocsFilesJSON");
        var url = "https://www.googleapis.com/drive/v3/files?orderBy=folder+desc%2CcreatedTime+desc%2C+name&pageSize=" + numOfFiles + "&q='" + dirID + "'+in+parents&fields=files%2CincompleteSearch%2Ckind%2CnextPageToken&key=" + API_KEY;
        //https://www.googleapis.com/drive/v3/files?orderBy=folder+desc%2CcreatedTime+desc%2C+name&pageSize=100&q='0B2O1Jb96t9jhZUdoNU0ySDJjN00+in+parents&fields=files%2CincompleteSearch%2Ckind%2CnextPageToken&key=AIzaSyBuW_tArn70PeThSmTIDFNLyfSG_piFKQQ
        /* The setup
         *  
         *  Generate the public URL. Go to: https://developers.google.com/apis-explorer/?hl=en_GB#p/drive/v3/drive.files.list
         
         In the 'q' field enter the following:
         
         '{your_public_folder_id}' in parents
         Click the "Execute without OAuth" link underneath the button.
         
         You should now see all your files listed underneath. It also show you the GET request. That is the URL you will need.
         
         Copy the Request URL. Something like: https://www.googleapis.com/drive/v3/files?q='{your_public_folder_id}'+in+parents&key={YOUR_API_KEY}
         
         Now, you will need to generate the API key. Go to Google Console: https://console.developers.google.com/ In left menu select 'Credentials'. Click 'Create credentials' and select API key. Click 'Browser key' Copy the generate key.
         
         */
        $.getJSON(url, funcResponse).done(function () {
            console.log("second success");
        }).fail(function () {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        }).always(function () {
            console.log("complete");
        });

    }
});
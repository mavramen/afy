
function addToHeader() {
    var doc = document.querySelector('link[rel="import"]').import;
    // console.log(doc);
    if (!doc) {
        w3IncludeHTML();
        doc = document.getElementById('alternative');
        //console.log(doc.children.length);
    }

    console.log('before  head=' + document.head.children.length);
//alert('1');
    setTimeout(function () {
        console.log("Hello");
        var div = doc.querySelector('.header-includes')
        console.log('div=' + div.children.length);

        //console.log(div);
        for (var child = div.firstChild; child !== null; child = child.nextSibling) {
            document.head.appendChild(child.cloneNode(true));
            console.log('head=' + document.head.children.length);

        }
    }, 300);




}
/*
 * 
 * 
 *  <link rel="import" href="header.html">
        <script src="assets/js/loadHeader.js"></script>

        <script>
            addToHeader();
        </script>
 * 
 */
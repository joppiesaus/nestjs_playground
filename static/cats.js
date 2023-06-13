// do you ever feel like,, screw it, just plain ancient javascript
var getJSON = function( url, callback, errorCallback ) {

    var x = new XMLHttpRequest();

    x.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status === 200 ) {
                callback.call( x, this.responseText );
            } else {
                errorCallback.call( x, this.statusCode );
            }
        }
    };

    x.open("GET", url, true);
    x.send();

};


var getCats = function() {

    var catListEl = document.querySelector( "#catList" );
    catListEl.textContent = "Loading cats...";

    getJSON( "cat/all.json", function( responseText ) {

        catListEl.textContent = "";

        var obj = JSON.parse( responseText );

        console.log( obj );

        for ( var i = 0; i < obj.length; i++ ) {


            // TODO: make pretty and and delete
            var cat = obj[ i ];

            var entryEl = document.createElement( "div" );
            entryEl.className = "entry";

            entryEl.textContent = cat.name + "    " + cat.description;

            catListEl.appendChild( entryEl );

        }

    }, function( statusCode ) {

        // IDK this doesn't work for some reason
        catListEl.textContent = "ERROR: " + statusCode + ": " + this.statusText;

    } );
};

window.onload = function() {
    getCats();
};
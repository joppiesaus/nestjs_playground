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

    x.open( "GET", url, true );
    x.send();

};

var deleteCat = function() {

    var x = new XMLHttpRequest();

    x.onreadystatechange = function() {

        // TODO: fix
        console.log(this.readyState);
        console.log( this );

        if ( this.readyState == 4 ) {

            if ( this.status === 200 ) {
                getCats();
            } else {
                alert("ERROR!"); // trollface
            }
        }
    };

    x.open( "DELETE", "cat/" + this.dataset.id, true );
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

            var cat = obj[ i ];

            var entryEl = document.createElement( "div" );
            entryEl.className = "entry";

            var nameEl = document.createElement( "span" );
            nameEl.className = "name";
            nameEl.textContent = cat.name;
            entryEl.appendChild( nameEl );

            var descriptionEl = document.createElement( "span" );
            descriptionEl.className = "description";
            descriptionEl.textContent = cat.description;
            entryEl.appendChild( descriptionEl );

            var deleteEl = document.createElement( "input" );
            deleteEl.className = "deleteButton";
            deleteEl.type = "submit";
            deleteEl.value = "Delete Cat :(";
            deleteEl.dataset.id = cat.id;
            deleteEl.onclick = deleteCat;
            entryEl.appendChild( deleteEl );

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
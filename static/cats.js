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

        if ( this.readyState == 4 ) {

            if ( this.status === 200 ) {
                getCats();
            } else {
                alert( "Error deleting cat: " + this.responseText ); // trollface
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

        var amountEl = document.createElement( "p" );
        if ( obj.length === 0 ) {
            amountEl.textContent = "There are no cats yet :( Maybe... create a new one??? XDD";
        } else if ( obj.length === 1) {
            amountEl.textContent = "There is one cat:";
        } else {
            amountEl.textContent = "There are " + obj.length + " cats:";
        }
        catListEl.appendChild( amountEl );

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
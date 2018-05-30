'use strict';

var logic = (function () {
    function call(path, callback) {
        var xhr = new XMLHttpRequest();

        // xhr.addEventListener('load', function () {
        //     var results = JSON.parse(this.responseText);

        //     callback(undefined, results);
        // });

        // xhr.onload = function () {
        //     var results = JSON.parse(this.responseText);

        //     callback(undefined, results);
        // };

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var results = JSON.parse(this.responseText);

                    callback(undefined, results);
                // } else {
                //     callback(Error(xhr.status));
                }
            }
        };

        xhr.timeout = 2000;

        xhr.ontimeout = function(e) {
            console.warn('xhr timeout');

            callback(Error('timeout'));
        };

        xhr.onerror = function (e) {
            console.error('xhr error');

            callback(Error(xhr.status));
        };

        xhr.open("GET", "https://quiet-inlet-67115.herokuapp.com/api/" + path);
        xhr.send();
    }

    return {
        searchBeers: function (query, callback) {
            call('search/all?q=' + query, callback);
        },

        getBeerInfo: function (id, callback) {
            call('beer/' + id, callback);
        }
    };
})();
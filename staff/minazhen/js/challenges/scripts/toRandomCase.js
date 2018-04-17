var ckRand = [];

function toRandomCase(str) {
    ckRand = [];
    if (typeof str !== 'string') {
        throw Error(" input " + str + " is not a valid string");
    }
    var string = str;
    var letters = "";
    for (var i = 0; i < string.length; i++){
        var l = string.charAt(i);
        if (l.match(/[A-z]/)) {
            l = l.toLowerCase();
            var rand = Math.random();
            ckRand.push(rand.toFixed(4));
            if (rand > 0.5) l = l.toUpperCase();
        }
        letters  += l;
    }
    return letters;
}

"use strict"
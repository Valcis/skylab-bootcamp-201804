"use strict";

/**
 * Changes each letter randomly between lowe case and upper case.
 * 
 * @example
 * 
 * var r = toRandomCase('ab'); //-> "aB" or "ab" or "AB" or "Ab"
 * 
 * @param {string} str - The text to randomly change the letters.
 * 
 * @throws {Error} - If input str is not a string.
 * 
 * @returns {string} - New string with random lower/upper case letters. 
 */


function toRandomCase(str) {
    
    if (typeof str !== 'string') {
        throw Error("Input is not a valid string");
    }
    
    var ckRand = [];
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


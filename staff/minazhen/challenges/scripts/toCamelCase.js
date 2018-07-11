"use strict";

/**
 * Count words in a sentence(string).
 * 
 * @example
 * 
 * var count = countWords("Hello World"); //-> 2
 * 
 * @param {string} str - The text to count the words from.
 * 
 * @throws {Error} - If input str is not a string.
 * 
 * @returns {number} - A copy of the string tranformed into camel case. 
 */

function toCamelCase(str){
    if (typeof str !== "string") throw Error("Write a valid string on input.")
    var camel = str.split(" ");
    var conc = [];

    for (var i = 0; i < camel.length; i++){
        var camelIdx = camel[i];
        if (i === 0) {
            conc.push(camelIdx.charAt(0).toLowerCase() + camelIdx.slice(1));
        } else {
            conc.push(camelIdx.charAt(0).toUpperCase() + camelIdx.slice(1));
        }
    }
    return conc.join("");
};
"use strict";

/**
 * Count words in text(string).
 * @example
 * 
 * var count = countWords('Hello World') //-> 2
 * var count = countWords('Hello litte World') //-> 3
 * 
 * @param {string} str - The text to count the words from.
 * 
 * @throws {Error} - If input text is not a string.
 * 
 * @returns {number} - The number of words counted. 
 */

function countWords(str){
    if (typeof str !== "string") throw Error ("Input str is not a string");
    
    return str.split(" ").length; 
}
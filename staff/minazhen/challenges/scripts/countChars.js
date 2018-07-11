"use strict";

/**
 * Count chars in text(string).
 * @example
 * 
 * var count = countChars("Hello World", function(x) { return x === "o"; }); //-> 2
 * 
 * @param {string} str - The text to count the chars from.
 * @param {Function} [handler] - A condition to count chars (optional).
 * 
 * @throws {Error} - If input text is not a string.
 * @throws {Error} - If given a condition, is not a function.
 * 
 * @returns {number} - The number of chars count in the input str. 
 */

function countChars(str, handler){
    if (typeof str === "string") {
        if (handler) {
            if (typeof handler !== 'function') throw Error('Input handler is not a function');
                var count = 0;

            for (var i = 0; i < str.length; i++) {
                var val = str[i];

                if (handler(val)) count++;
            }

            return count;
            
        }
        return str.length; 
    }
    throw Error ("Input str is not a string");
}

"use strict";

/**
 * Count chars in text (string).
 * 
 * @example
 * 
 * var count = countChars('hello world', function(c) { return c === 'e'; }); // -> 1
 * 
 * @param {string} text - The text to count the chars from.
 * @param {function} [condition] - A condition to count chars (optional).
 * 
 * @throws {Error} - If input text is not a string.
 * @throws {Error} - If given a condition, is not a function.
 * 
 * @returns {number} - The number of chars count in the input text.
 */
function countChars(text, condition) {
    if (!text && !condition) throw Error('there are no inputs')
    
    // check input text is valid, must be a string
    if (typeof text !== 'string')
        throw Error('input text is not a string');

    
    // check condition exists, otherwise return string length
    if (!condition) {
        return text.length;
    }

    // check condition is valid, must be a function
    if (typeof condition !== 'function')
        throw Error('input condition is not a function');

    var count = 0;

    for (var i = 0; i < text.length; i++) {
        var val = text[i];

        if (condition(val)) count++;
    }

    return count;
}
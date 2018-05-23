'use strict';
/**
 * 
 * @param {String} str - the text to count the chars from. 
 * @param {Function} func - A condition to count chars. (optional)
 * 
 * @returns {Number} - The number of chars in the input text.
 * 
 * @throws {Error} - If input text is not a string.
 * @throws {error} - If given a condition, is not a function.
 */

function countChars(str, func) {
    if (typeof str !== 'string')
        throw Error('input str is not a string');

    if (!func) {
        return str.length;
    } else {
        if (typeof func !== 'function')
            throw Error('input func is not a function')

        var count = 0;

        for (var i = 0; i < str.length; i++) {
            var val = str[i];

            if (func(val)) count++;
        }

        return count;
    }
}

'use strict'
/**
 * 
 * A function that converts an input of strings in a new one that each word or abbreviation in the middle of the 
 * phrase begins with a capital letter, with no intervening spaces or punctuation.
 * @example
 * 
 * toCamelCase("dream works")->"DreamWorks"
 * 
 * @param {string} str 
 * 
 * @throws {Error} - If input str is not a string.
 * @returns {string} -A new string in Camel Case.
 */
function toCamelCase(str) {
    if (typeof str !== 'string')
        throw Error('input str is not a string');

    return str.split(' ').map(function (word, index) {
        if (index == 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');



}


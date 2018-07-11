'use strict'

/**
 * Count chars in text (string).
 * 
 * @example
 * 
 * var count= countWords('Hello world')console.log('countWords)// -> 2;
 * 
 * @param {string} words - The text to count the words from.
 * 
 * @throws {Error} - If input text is not a string.
 * 
 * @returns {number} - The number of words count in the input words.
 */


function countWords(words) {
    // check input text is valid, must be a string
    if (typeof words !== 'string')
        throw Error('input words is not a string');
    
    return words.split(" ").length;
}
'use strict'; 
/**
 * count the number of words
 * @example 
 * 
 * function(str) {
 * return str.split(' ').length;
 * }
 *  countWords("Hello World"); -> // 2;
 * 
 * @param {string} str The text to count the words from.
 * @throws {Error} If input is not a string.
 * 
 * @returns The number of words count in the input text.
 */

function countWords(str){
  if (typeof str !== 'string')
    throw Error('input is not a string');
  return str.split(' ').length;

}
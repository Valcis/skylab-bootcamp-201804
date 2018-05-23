'use strict';
/**
 * Convert string to camel case
 * @example
 * toCamelCase('Hello World') // -> helloWorld
 * @param {string} str - 
 */
function toCamelCase(str) {
  if (typeof str !== 'string') {
    throw Error('input is not a string');
  }
    return str.split(' ').map(function (word, index) {
      // If it is the first word make sure to lowercase all the chars.
      if (index == 0) {
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}
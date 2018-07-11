'use strict';
/**
 * map creates a new array with the results of calling a function for every array element.
 * 
 * @example
 * 
 * var input = [1,2,3]; map(input, function(v){return v**;}); -> [1,4,9]
 * 
 * @param {Array} arr- The array to iterate.
 * @param {Function} handler - A function to be run for each element in the array.
 * 
 * @throws {Error} - If input arr is not an array.
 * @throws {Error} - If handler is not a function.
 * 
 * @returns {Array} - A new array after operatin on each value of the input.
 */

function map(arr, handler) {

    if (!(arr instanceof Array)) throw Error('input array is not valid');

    if (!(handler instanceof Function)) throw Error('input handler is not valid');

    var res = [];
    
    for (var i = 0; i < arr.length; i++) {

       res[i]=handler(arr[i]);
    
}
    return res;
}







"use strict";

/**
 * Check all elements from an array (is a recursive forEach).
 * 
 * @example
 * 
 * forEach([1, 2], function(v, i, arr){console.log(v, i, arr)}); // -> 1 0 (2) [1, 2] & 2 1 (2) [1, 2]
 * forEach([1, 2], function(v, i){output.push(v, i)}); // -> [1, 0, 2, 1]
 * forEach([1, 2], function(v)); // -> 1 0
 * 
 * @param {Array} arr - The array.
 * @param {Function} handler - What should the program do on each loop.
 * 
 * @throws {Error} - If the input arr is not an array.
 * @throws {Error} - If the input handler has not a function.
 * 
 * @returns - It does a function (handler) once per each array element.
 */

function forEach(arr, handler){
    var arra = [];
    if (!Array.isArray(arr)) throw Error("Write a valid array on input.");
    if (typeof handler !== 'function') throw Error('Input handler is not a function.');
    var loop = function(index) {
        var idxArr = arr[index];
        handler(idxArr, index, arr);
        if (++index < arr.length) loop(index);
    }
    loop(0);
}
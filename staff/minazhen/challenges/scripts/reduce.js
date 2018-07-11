"use strict";

/**
 * Check all elements from an array (is a recursive forEach).
 * 
 * @example
 * 
 * reduce([1,2,3,4,5], function(acc, a_id) {if (a_id > 2) return acc + a_id; return acc}, 10) -> 22
 * reduce([1,2,3,4,5], function(acc, a_id) {if (a_id < 3) return acc + a_id; return acc}) -> 2 
 * reduce([1,2,3,4,5], function(acc, a_id) {if ((a_id % 2)===1) return acc + a_id; return acc}, 0.1) -> 9.1
 * 
 * @param {Array} arr - The array.
 * @param {Function} handler - What should the program filter and accumulate on each loop.
 * @param {number} [initialValue] - Initial value of counter.
 * 
 * @throws {Error} - If the input arr is not an array.
 * @throws {Error} - If the input handler has not a function.
 * 
 * @returns -  Applies a function in each array element and reduce them to a single value.
 */

function reduce(arr, handler, initialValue = 0){
    if (!Array.isArray(arr)) throw Error("Write a valid array on input.");
    if (typeof handler !== 'function') throw Error('Input handler is not a function.');
    var counter = initialValue;
    for (var i = 0; i < arr.length; i++){
        counter = handler(counter, arr[i]);
    }
    if (typeof counter !== 'number') throw Error("Check your handler, doesn't return a number.");
    return parseFloat((counter).toFixed(4));
}
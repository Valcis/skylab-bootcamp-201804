"use strict";

/**
 * Returns a new array changing all elements from another one.
 * 
 * @example
 * 
 * map(["a", "e"], function(v, i, a) {return  i +"_"+ v.toUpperCase() +"-"+ a[i]; }); // -> ['1_JOHN from john', '2_MARY from mary', '3_JACK from jack']
 * 
 * @param {Array} arr - The array.
 * @param {Function} handler - What should the program do on each loop.
 *
 * @throws {Error} - If the input arr is not an array.
 * @throws {Error} - If the input handler has not a function.
 * 
 * @returns -  Applies a function in each array element and return a new array.
 */

function map(arr, handler){
    if (!Array.isArray(arr)) throw Error("Write a valid array on input.");
    if (typeof handler !== 'function') throw Error('Input handler is not a function.');
    var newArr = [];
    for (var i = 0; i < arr.length; i++){
        newArr.push(handler(arr[i], i, arr));
    }
    return newArr;
}
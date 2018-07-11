"use strict";

/**
 * Returns the first element from an input arry that satisfies a given condition.
 * 
 * @example
 * 
 * var input = ["john", "mary", "jack"];
 * 
 * find(input, function(v) {return v.indexOf("a") > -1;}); -> "mary"
 * 
 * @param {Array} arr - The array.
 * @param {Function} handler - What should the program do on each loop.
 * 
 * @throws {Error} - If the input arr is not an array.
 * @throws {Error} - If the input handler has not a function.
 * 
 * @returns -  Applies a function in each array element and reduce them to a single value.
 */

function find(arr, handler){
    if (!(arr instanceof Array)) throw Error("Input array not valid");
    if (!(handler instanceof Function)) throw Error("Input handler not valid");

    for(var i = 0; i < arr.length; i++){
        var val = arr[i];
        if (handler(val))return val;
    }
}
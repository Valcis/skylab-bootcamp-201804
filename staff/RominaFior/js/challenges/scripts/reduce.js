'use strict';

/**
 * The function reduce reduces the array to a single value, executes a provided function for each value of the array (from left-to-right), return value of the function is stored in an accumulator (result/total).
 * 
 * @example
 * 
 * var a = [{ name: 'jeans', price: 10.5 }, { name: 't-shirt', price: 5.99 }, { name: 'socks', price: 19.99 }];
 *
 *   var result= reduce(a, function(accum, v){
 *   if (v.price > 10){
 *       return accum + v.price;
 *   }
 *   return accum;
 * });
 *
 * console.log(result); -> 30.49
 * 
 * @param {arr} Array - The array to iterate.
 * @param {handler} function - A function to be run for each element in the array.
 * 
 * @throws {Error} - If input arr is not an array.
 * @throws {Error} - If handler is not a function.
 * 
 * @returns {number} - A single number.
 */
function reduce(arr, handler) {

    if (typeof arr !== 'object' || !arr instanceof Array) throw Error('input array is not an array');

    if (typeof handler !== 'function') throw Error('input handler is not a function');

    var count = 0;

    for (var i = 0; i < arr.length; i++) {

        count = handler(count, arr[i]);

    }

    return count;
}


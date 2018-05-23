'use strict';

/**
 * forEach calls a provided function once for each element in an array, in order.
 * 
 * @example
 * 
 * var a = [1, 2, 3] var result = foreach(a, console.log); -> 1 2 3 
 * 
 * @param {arr} Array - The array to iterate.
 * @param {handler} function - A function to be run for each element in the array.
 * 
 * @throws {Error} - If input arr is not an array.
 * @throws {Error} - If handler is not a function.
 * 
 * @returns {Array} - A new array of numbers.
 */

function forEach(arr, handler) {
  if (typeof arr !== 'object' || !arr instanceof Array) throw Error('input array is not an array');

  if (typeof handler !== 'function') throw Error('input handler is not a function');

  var iterate = function (index) {
    handler(arr[index]);

    if (++index < arr.length) iterate(index);
  }

  iterate(0);
}

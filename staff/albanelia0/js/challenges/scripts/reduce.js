'use strict';

/**
 * method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
 * @example
 * var array = [1, 2, 3, 4];
 * function reduce(accumulator, array) {
 *  return accumulator + array; // -> 10
 * });
 * 
 * @param {array} arr - the array argument that you pass
 * @param {function} func - the function argument that you pass
 * 
 * @throws
 * if the input is not a array or function
 */
function reduce(arr, func) {
  if (typeof arr !== 'object' || !arr instanceof Array) throw Error('input array is not an array');
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    count = func(count, arr[i]);
  }
  return count;
  
}



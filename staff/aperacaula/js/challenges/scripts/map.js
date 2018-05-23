"use strict";
/**
 * Maps the values from an input array into a new array
 *
 * @example
 *
 * map([1,2,3], function(a){return a*3})----- returns [3,6,9]
 *
 * @param {Array} array - reference array to which we will act
 * @param {Function} action - action to perform to each member
 *
 * @returns {Array} final array, comes from performing the action onto the given array
 */

function map(array, action) {
  if (!(array instanceof Array)) throw Error("first input not array type");
  if (typeof action !== "function")
    throw Error("second input not function type");

  var arr_new = [];
  for (var i = 0; i < array.length; i++) {
    arr_new.push(action(array[i]));
  }
  return arr_new;
}

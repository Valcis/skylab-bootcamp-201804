'use strict';

var array1 = [1, 2, 3, 5];
var array2 = [2, 30, 1, 4];

/**
 * Write a function to merge two arrays, remove all duplicate elements and put into brackets the odd numbers
 * 
 * @param {Array} array1 - Accepts an array as a first parameter
 * @param {Array} array2 - Accepts an array as a second parameter
 * 
 * @example
 * 
 * var array1 = [1, 2, 3, 5];
 * var array2 = [2, 30, 1, 4];
 * console.log(arrayMerger(array1, array2)); / / return →[{ 3}, { 5}, 30, 4];
 * 
 * @throws if the parameters are not an array
 */

function arrayMerger(array1, array2) {
  if (!(array1 instanceof Array)) throw Error('parameter not valid');
  if (!(array2 instanceof Array)) throw Error('parameter not valid');
    
  var arrayB = array2;
  var arrayA = array1;
  var result = [];
  var c = ['{ ', '}'];
  
    for (var i = 0; i < arrayB.length; i++) {
      var e = arrayA[i];
      if (arrayB.indexOf(e) === -1) {
        result.push(c[0] + e + c[1]);
      }   
    }
    for (var i = 0; i < arrayB.length; i++) {
      var e = arrayB[i];
      if (arrayA.indexOf(e) === -1) {
        result.push(e);
      }
    }

  return result;
}


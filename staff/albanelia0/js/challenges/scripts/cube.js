/**
 * Calculates the cube of an input number, or array of numbers.
 * 
 * @example
 * 
 * var res = cube(3); // -> 27
 * 
 * var res = cube([1, 2, 3]); // -> [1, 8, 27]
 * 
 * @param {number | number[]} num - The input number or array of numbers.
 * 
 * @throws {Error} - If input number or array of numbers is not valid.
 * 
 * @returns {number | number[]} - The cube of the input number or array of numbers. 
 */
function cube(num) {
  if (typeof num === 'number') return num ** 3;


  if (!(num instanceof Array)) throw Error('input num is not a number, neither an array');


  for (var i = 0; i < num.length; i++) {
    if (typeof num[i] !== 'number') throw Error('input array is not a number at index ' + i);
  }
  var res = [];
  for (var i = 0; i < num.length; i++) {
    var val = num[i];
    res[i] = val ** 3;
  }
  return res;
}
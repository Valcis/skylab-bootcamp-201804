'use strict';
/**
 * returns the Roman number from 1 to 10
 * 
 * @param {number} number 
 * @example
 * numberRoman(2) // -> II
 * @throws
 * if the input is not a number
 */
function numberRoman(number) {
  var object = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X'
  }

  var result;
  for (var key in object) {

    if (typeof number !== 'number') {
      throw Error('input is not a number');
    }
    if (key == number) {
      result = object[key];
    }


  }
  return result;
}

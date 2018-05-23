'use strict';

if (typeof Array.prototype.toRandomCase !== "function") {

/**
 * convert one letter to lowercase and the other uppercase
 * 
 * @example: 
 * var array = ['albanelia'];
 * toRandomCase(array) // -> AlBaNeLiA
 * @param {array} 
 * @throws if the input is not an array
 * 
 */
  Array.prototype.toRandomCase = function() {
    if (! Array.isArray(this)) throw Error('input is not a array!');
    var array = [];
    var letter = this.toString();
    var value = '';
    for (var i = 0; i < letter.length; i++) {

      if ((i % 2) === 1) {//->impar
        value += letter.charAt(i).toUpperCase();
      } else {
        value += letter.charAt(i).toLowerCase();
      }
    };
    return value;
  }
}




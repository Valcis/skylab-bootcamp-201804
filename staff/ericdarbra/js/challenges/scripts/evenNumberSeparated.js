'use strict';

/**
 * 
 * @example 
 * 
 * var a = [025468, 45846]
 * a.evenNumberSeparated(“-”) → the output should be [0-254-6-8,458-4-6]
 * 
 * 
 */
/* 
var a = [2435766, 664432]

Array.prototype.evenNumberSeparated = function (char) {
    var v = this.toString;

    for (var i = 0; i < v.length; i++) {
        if (v[i] % 2 == 0) {
            v[i] = char + v[i];
        }
        return v[i];
    }
    return v;
} */

var a = [2435766, 664432]


function evenNumber(array) {
    var string = array.toString;
    var lastNumberEven = false;
    var firstNumberEven;
    var separator;
    for (i = 0; i < array.length; i++) {
        if ((firstNumberEven = string[i] % 2 == 0) && lastNumberEven) {
        separator += '-';
        }
        separator += string[i];
        lastNumberEven = firstNumberEven;
    }
    return separator;
}
evenNumber('-');
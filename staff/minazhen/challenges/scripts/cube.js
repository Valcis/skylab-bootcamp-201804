"use strict";

/**
 * Calculates the cube of an input number, or array of numbers.
 * 
 * @example
 * 
 * var result = cube(3); //-> 27
 * 
 * var result = cube([1, 2, 3]); // -> [1, 8, 27]
 * 
 * @param {number|number[]} n - The input or array of numbers.
 * 
 * @throws {Error} - If input number or array of numbers is not valid.
 * 
 * @returns - The cube of the input number or array of numbers.
 */

function cube(n){
    var arr = [];

    if (typeof n === "number") return n ** 3;

    if (Array.isArray(n)){
        for (var i = 0; i < n.length; i++){
            var idxN = n[i];
            if (typeof idxN !== "number") throw Error("Array can only include numbers, check index " + i);
            arr.push(parseFloat((Math.pow(idxN, 3)).toFixed(4)));
        }
        return arr;
    }
    throw Error(n + " is not a valid value.");
}
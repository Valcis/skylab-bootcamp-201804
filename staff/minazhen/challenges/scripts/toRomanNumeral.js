"use strict";

/**
 * Converts a number to a roman number.
 * 
 * @example
 * 
 * var roman = toRomanNumeral(1234); //-> MCCXXXIV 
 * var roman = toRomanNumeral(2.2)//-> II, roman people didn't use decimals.
 * 
 * @param {number} n - The numerical value to transform.
 * 
 * @throws {Error} - If input is not a number.
 * @throws {Error} - If number is negative.
 * @throws {Error} - If number is bigger than 3999999.
 * 
 * @returns {number} - Roman number. 
 */

function toRomanNumeral(n){
    var num = n;
    if (typeof num !== 'number') {
        throw Error("Input is not a valid number.");
    }
    if (num < 0) throw Error("Romans didn't use negative numbers.");
    if (num > 3999999) {
        throw Error("Program only recognizes until M\u0305 number.");
    }
    var firstNumb = num;
    var bool = false;

    var bool = Number.isInteger(num);
    var conc = [];
    var nums = [[1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X","IX","V","IV","I"]];
    for (var i = 0; i < nums[0].length; i++) {
        var idNums = 0;
        for (var id = 0; id < nums[0].length; id++) {
            idNums = nums[0][id]*1000;
            if(num > 3999){
                while (num % idNums < num) { 
                    var big = nums[1][id];
                    if(big.length == 2) {
                        conc.push(big.charAt(0) + "\u0305" + big.charAt(1) + "\u0305");
                    } else {
                        conc.push(big + "\u0305");
                    }
                    num -= idNums;
                }
            }
        }
        idNums = nums[0][i];
        while (num % idNums < num) { 
            conc.push(nums[1][i]);
            num -= idNums;
        }
    }
    if (!bool) conc.push(", roman people didn't use decimals.")
    return conc.join("");
}


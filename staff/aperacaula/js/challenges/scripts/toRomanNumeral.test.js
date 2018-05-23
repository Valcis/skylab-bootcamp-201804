"use strict";
var count= toRomanNumeral(3);
console.log("toRomanNumeral(3) should return III and it returns ", count==='III', count);

var count= toRomanNumeral(4);
console.log("toRomanNumeral(4) should return IV and it returns ", count==='IV', count);

try {
    var count= toRomanNumeral('rr')
} catch (error) {
    console.log("toRomanNumeral(rr) should launch an error and it returns ", error!==undefined, error);
    
}
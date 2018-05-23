"use strict";

//esta función intentará pasar a romano cualquier numero
function toRomanNumeralBig(num) {
  if (typeof num === "number") {
    var dic = [0, "I", "II", "III", "V", "X", "L", "C", "D", "M"];
    var arr = num.toString().split("");
    var arr_final = [];
    for (var i = 0; i < arr.length; i++) {
      var cifra = Number(arr[i]);
      if (i === 0) {
        if (cifra > 5 && cifra % 5 !== 4) {
          arr_final.push(dic[4] + dic[cifra]);
        } else if (cifra < 5 && cifra % 5 !== 4) {
          arr_final.push(dic[cifra]);
        }
      }
    }
  } else {
  }
  throw Error("input is not a string");
}

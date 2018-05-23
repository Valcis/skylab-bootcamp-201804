"use strict";
function toCamelCase(str) {
  if (typeof str === "string") {
    var arr = str.toLowerCase().split(" ");
    for (var i = 1; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
    return arr.join("");
  }else{
      throw Error('input is not a string');
  }
}

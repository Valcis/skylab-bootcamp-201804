"use strict";
function reduce(a, func) {
  if (typeof func === "function" && a instanceof Array) {
    var count = 0;
    for (var i = 0; i < a.length; i++) {
      count = func(count, a[i]);
    }
    return count;
  }else{
    throw Error("uiuiui");
  }
}

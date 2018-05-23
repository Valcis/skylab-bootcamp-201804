'use strict';

if (!(Array.prototype.wrap instanceof Function)) {
  Array.prototype.wrap = function(ch1, ch2) {
    if (typeof ch1 !== "string" || typeof ch2 !== "string")
      throw Error("wrong input type");
    var new_arr=[];
    for(var i=0; i<this.length; i++){
        new_arr[i]= ch1+this[i]+ch2
    }
    return new_arr;
  };
}

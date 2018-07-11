'use strict';

/**
 * Add characters at beginning and end from a array index.
 * 
 * @example var a = [1, 2, 3]; a.wrap("[", "]").wrap("'", "'").wrap("<", ">"); // --> ["<'[1]'>", "<'[2]'>"]
 * @example ["a","b","c"].wrap(".","/").wrap("\",".").wrap("-", "-"); --> ["-\.a/.-","-\.b/.-"]
 * 
 * @param {string} w1 - Characters to write before the array[id].
 * @param {string} w2 - Characters to write after the array[id].
 * 
 * @returns {Array} - The resulting array after adding the strings.
 */

if(typeof Array.prototype.wrap !== "function") {
    Array.prototype.wrap = function(w1, w2) {
        var newArr = [];
        
        if ((typeof w1 !== "string")||(typeof w2 !== "string")) throw Error ("Wrap input should be two strings.");
        for(var i = 0; i < this.length; i++) {
            newArr.push(w1 + this[i].toString() + w2);
        }
        if (this.length === 0) throw Error ("Array needs to content something.");
        return newArr;

        
    }
}
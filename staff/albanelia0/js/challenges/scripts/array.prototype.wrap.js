

if (typeof Array.prototype.wrap !== "function"){

/**
 * Wrap the items of the input with txt1 and txt2 array and return them in a new array.
 *  
 * @param {string} txt1 - You pass the value that you want to add and they may be 3.
 * @param {string} txt2 - 
 * 
 * @example 
 * var a = [1, 2, 3]
 * a.wrap('[', ']'); // -> ['[1]', '[2]', '[3]']
 * a.wrap('[', ']').wrap('{', '}'); // -> ['{[1]}', '{[2]}', '{[3]}']
 * a.wrap('[', ']').wrap('{', '}').wrap('<', '>'); // -> ['<{[1]}>', '<{[2]}>', '<{[3]}>']
 * 
 * @throws {Error} - If the input is not a string.
 * 
 */

  Array.prototype.wrap = function(txt1,txt2) {
    if (typeof txt1 !== 'string') throw Error('input txt1 is not a string!');
    if (typeof txt2 !== 'string') throw Error('input txt2 is not a string!');
    var array = [];
    for (var i = 0; i < this.length; i++) {
        array.push(txt1+this[i]+txt2);
    }
    return array;
  };
}

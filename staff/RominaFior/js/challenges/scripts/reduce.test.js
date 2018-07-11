'use strict';




/*var res = reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }, 0);

console.log('reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }, 0) should return 15', res === 15, res);

res = reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; });

console.log('reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }) should return 15', res === 15, res);

var error;
 */
test(
    withErrorCapturing(
        function() {
            reduce();
        }
    ),
    'reduce() without arguments should throw an error',
    function(result) {
        return result.message === 'input array is not an array';
    }
);

test(
    withErrorCapturing(
        function() {
            reduce(undefined, function(v) { output.push(v) });
        }
    ),
    'forEach(undefined, function(v) { output.push(v) }) without first argument should throw an error',
    function(result) {
        return result.message === 'input array is not an array';
    }
);

test(
    withErrorCapturing(
        function() {
            reduce(input);
        }
    ),
    'reduce(input) without second argument should throw an error',
    function(result) {
        return result.message === 'input handler is not a function';
    }
); 
  
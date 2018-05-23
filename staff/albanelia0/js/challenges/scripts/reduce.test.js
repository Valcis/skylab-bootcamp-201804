'use strict';

test(
  function () {
    return reduce([1, 2, 3, 4, 5], function (accum, v) { return accum + v; }, 0);
  },
  'reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }, 0) - with all arguments - should return 15',
  function (result) {
    return result === 15;
  }
);


test(
  withErrorCapturing(
    function () {
      return reduce();
    }
  ),
  'reduce() - without any arguments - should throw an error',
  function (result) {
    return result.message === 'input array is not an array';
  }
);

test(
  withErrorCapturing(
    function () {
      return reduce(undefined, function (accum, v) { return accum + v; });
    }
  ),
  'reduce(undefined, function(accum, v) { return accum + v; }) - without first argument - should throw an error',
  function (result) {
    return result.message === 'input array is not an array';
  }
);

test(
  withErrorCapturing(
    function () {
      return reduce([]);
    }
  ),
  'reduce([]) - without second argument - should throw an error',
  function (result) {
    return result.message === 'input handler is not a function';
  }
);
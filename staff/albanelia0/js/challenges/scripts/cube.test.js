'use strict';

test(function () {
  return cube(3);
},
  'cube(3) should return 27',
  function (result) {
    return result === 27;
  });

test(function () {
  return cube([1, 2, 3]);
},
  'cube([1, 2, 3]) should return [1, 8, 27]',
  function (result) {
    return result.toString() === [1, 8, 27].toString();
  });

test(withErrorCapturing(function () {
  cube(true);
}),
  'cube(true) should throw an error',
  function (result) {
    return result.message === 'input num is not a number, neither an array';
  });

test(withErrorCapturing(function () {
  cube([1, 2, 'a']);
}),
  'cube([1, 2, "a"]) should throw an error',
  function (result) {
    return result.message === 'input array is not a number at index 2';
  });

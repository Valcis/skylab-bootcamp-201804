'use strict';

test (
  function () {
    return countChars('hello world');
  },
  'countChars("hello world") should return 11', function(result) {
    return result === 11;
  }
);

test(
  function () {
    return countChars('0123456789');
  },
  'countChars("0123456789") should return 10',
  function (result) {
    return result === 10;
  }
);

test(
  withErrorCapturing(function () {
    countChars(true);
  }),
  'countChars(true) should throw an error',
  function (result) {
    return result.message === 'input text is not a string';
  }
);

test(
  withErrorCapturing(function () {
    countChars(1);
  }),
  'countChars(1) should throw an error',
  function (result) {
    return result.message === 'input text is not a string';
  }
);

test(
  withErrorCapturing(function () {
    countChars([]);
  }),
  'countChars([]) should throw an error',
  function (result) {
    return result.message === 'input text is not a string';
  }
);

test(
  function () {
    return countChars('abracadabra', function (c) { return c === 'a'; });
  },
  'countChars("abracadabra", function(c) { return c === "a"; }) should return 5',
  function (result) {
    return result === 5;
  }
);

test(
    withErrorCapturing(function() {
        countChars('abracadabra', '...');
    }),
    'countChars("abracadabra", "...") should throw an error',
    function(result) {
        return result.message === 'input condition is not a function';
    }
);
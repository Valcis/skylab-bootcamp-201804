
'use strict';

test(
  function () {
    return find(['john', 'mary', 'jack'], function (v) { return v.indexOf('a') > -1; });
  },
  "find(['john', 'mary', 'jack'], function(v) { return v.indexOf('a') > -1; }) should return 'mary'",
  function (result) {
    return result === 'mary';
  }
);

test(
  function () {
    return find(['john', 'mary', 'jack'], function (v) { return v.indexOf('w') > -1; });
  },
  "find(['john', 'mary', 'jack'], function(v) { return v.indexOf('w') > -1; }) should return undefined",
  function (result) {
    return result === undefined;
  }
);

test(
  withErrorCapturing(
    function () {
      return find();
    }
  ),
  'find() should throw error',
  function (result) {
    return result.message === 'input array is not valid';
  }
);

test(
  withErrorCapturing(
    function () {
      return find([]);
    }
  ),
  'find([]) should throw error',
  function (result) {
    return result.message === 'input condition is not valid';
  }
);
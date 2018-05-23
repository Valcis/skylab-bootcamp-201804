'use strict';

test(
  function () {
    box.keep('123', 'my secret');

    return box.retrieve('123');
  },
  'box.keep() should save the secret ("my secret") correctly and box.retrieve() obtain it',
  function (result) {
    return result === 'my secret';
  }
);

test(
  withErrorCapturing(
    function () {
      box.retrieve('456');
    }
  ),
  'box.retrieve() should throw error if password is wrong',
  function (result) {
    return result.message === 'wrong password';
  }
);

test(
  withErrorCapturing(
    function () {
      box.retrieve();
    }
  ),
  'box.retrieve() should throw error if password is invalid',
  function (result) {
    return result.message === 'invalid password';
  }
);

test(
  function () {
    box.updatePassword('123', '456');

    return box.retrieve('456');
  },
  'box.updatePassword() should replace password correctly with new one and retrieve succeed',
  function (result) {
    return result === 'my secret';
  }
);
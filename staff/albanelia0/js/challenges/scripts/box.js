'use strict';

/**
 * Provides a security box to host a secret.
 */
var box = (function () {
  var _password = '123';
  var _secret;

  return {
    /**
     * Saves a secret inside the box.
     * 
     * @param {string} password - The box access credential.
     * @param {string} secret - The secret to keep securely inside the box.
     * 
     * @throws {Error} - If password is invalid or incorrect, or secret is invalid.
     */
    keep: function (password, secret) {
      if (typeof password !== 'string') throw Error('invalid password');

      if (typeof secret !== 'string') throw Error('invalid secret');

      if (_password !== password) throw Error('wrong password');

      _secret = secret;
    },

    /**
     * Recovers the secret from inside the box.
     * 
     * @param {string} password - The box access credential.
     * 
     * @throws {Error} - If password is invalid or incorrect, or secret is invalid.
     * 
     * @returns {string} - The secret, if password is correct.
     */
    retrieve: function (password) {
      if (typeof password !== 'string') throw Error('invalid password');

      if (_password !== password) throw Error('wrong password');

      return _secret;
    },

    /**
     * Replaces the previous password with a new one.
     * 
     * @param {string} password - The current password.
     * @param {string} newPassword - The new password.
     * 
     * @throws {Error} - If password is invalid or incorrect, or new password is invalid.
     */
    updatePassword: function (password, newPassword) {
      if (typeof password !== 'string') throw Error('invalid password');

      if (typeof newPassword !== 'string') throw Error('invalid new password');

      if (_password !== password) throw Error('wrong password');

      _password = newPassword;
    }
  };
})();
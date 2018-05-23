'use strict';

var box;
(function() {
  var password;
  var secret;
  box = {
    /**
     *
     * Saves a secret inside the box with a password to access it
     *
     * @param {string} password - The box access credential
     * @param {string} secret - The secret to keep securely inside the box
     *
     * @throws {error} - If password is wrong or secret invalid
     */
    keep: function(password_given, secret_given) {
      if (typeof password_given !== "string") throw Error("Invalid password");
      if (typeof secret_given !== "string") throw Error("Invalid secret");
      if (password === undefined) {
        password = password_given;
        secret = secret_given;
      }
      if (password!==password_given) throw Error('wrong password');
    },

    /**
     * Will show you the secret if you put the password
     *
     *
     * @param {string} password
     *
     *
     */
    retrieve: function(password_given) {
      if (password_given === password) {
        return secret;
      } else {
        throw Error("Invalid password");
      }
    },
    /**
     * Allows you to change the password
     * @param {String} password_given
     * @param {String} newPassword_given
     */
    updatePassword(password_given, newPassword_given) {
      if (typeof password_given !== "string") throw Error("Invalid password");
      if (typeof newPassword_given !== "string")
        throw Error("Invalid newPassword");
      if (password_given === password) password = newPassword_given;
    }
  };
})();

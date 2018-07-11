"use strict";

/**
 * Receive and gives a "secret" text protected by a password in a hidden function. 
 * Also is posible to change the password "if you now the older one".
 * 
 * @example box.keep("123", "blablabla");       //-> undefined
 *          box.retrieve("123");                //-> "blablabla"
 * @example box.updatePassword("123", "456");   //-> undefined
 *          box.retrieve("456");                //-> "blablabla"
 * 
 */
var box = (function () {
    var passWord = "123";
    var secret = "";
    return{
        /**
         * Introduce the password and a text to save in the box.
         * 
         * @param {string} pass - Known password.
         * @param {string} text - New text to add to "the secret".
         * 
         * @throws {Error} - If password is invalid or incorrect, or secret is invalid.
         */
        keep: function (pass, text) {
            if (typeof pass !== "string" || pass !== passWord) throw Error ("Invalid password");
            if (typeof text !== "string") throw Error ("Invalid text");
            secret += text + " ";    
        },
        /**
         * Introduce the password to receive "the secret".
         * 
         * @param {string} pass - Known password.
         * 
         * @throws {Error} - If password is invalid or incorrect.
         * 
         * @returns - If is the right password returns "the secret".
         */
        retrieve:function (pass) {
            if (typeof pass !== "string") throw Error ("Invalid password");
            if (pass !== passWord) throw Error ("Invalid password");
            return secret;
            
        },
        /**
         * Change the password.
         * 
         *@param {string} pass - Known password.
         *@param {string} newPass - New password to replace de older one. 
         *
         *@throws {Error} - If password is invalid or incorrect, or new password is invalid.
         */
        updatePassword: function (pass, newPass) {
            if (typeof pass !== "string" || typeof newPass !== "string") throw Error ("Invalid password");
            if (pass !== passWord) throw Error ("Invalid password");
            passWord = newPass;
            
        }
    }
})();
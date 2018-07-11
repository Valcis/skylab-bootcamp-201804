"use strict";

test(
    function() {
        box.keep("123", "blablabla");

        return box.retrieve("123");
    },
    'box.keep("123", "blablabla") should save "the secret" correctly and box.retrieve() obtain it.',
    function(result) {return result === box.retrieve("123")}
);

test(
    function() {
        box.updatePassword("123", "234");
        return box.retrieve("234");
    },
    'box.updatePassword("123", "234") should change the password and box.retrieve("234") obtain "the secret".',
    function(result) {return result === box.retrieve("234")}
);


test(
    errorHandling(
        function() {
            return box.retrieve("*****");
        }
    ),
    "box.retrieve('*****') should throw error if password is invalid",
    function(result) {
            return result.message === "Invalid password";
    }
)

test(
    errorHandling(
        function() {
            return box.keep("*****", "shh");
        }
    ),
    "box.keep('*****', 'shh') should throw error if password is invalid",
    function(result) {
            return result.message === "Invalid password";
    }
)

test(
    errorHandling(
        function() {
            return box.keep("234", []);
        }
    ),
    "box.keep('234', []) should throw error if password is invalid",
    function(result) {
            return result.message === "Invalid text";
    }
)

test(
    errorHandling(
        function() {
            return box.updatePassword("*****", "shh");
        }
    ),
    "box.updatePassword('*****', 'shh') should throw error if password is invalid",
    function(result) {
            return result.message === "Invalid password";
    }
)

test(
    errorHandling(
        function() {
            return box.updatePassword();
        }
    ),
    "box.updatePassword() should throw error if password is invalid",
    function(result) {
            return result.message === "Invalid password";
    }
)

test(
    errorHandling(
        function() {
            return box.updatePassword([], "shh");
        }
    ),
    "box.updatePassword([], 'shh') should throw error if password is invalid",
    function(result) {
            return result.message === "Invalid password";
    }
)



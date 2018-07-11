"use strict";

test(function () { return toCamelCase("Hello World");},
            "toCamelCase('Hello World') should return helloWorld",
            function (result) { return result === "helloWorld";
    });

test(function () { return toCamelCase("Hello little World");}, 
            "toCamelCase('Hello little World') should return helloLittleWorld", 
            function(result) {return result === "helloLittleWorld";
    });

test(errorHandling(function() {toCamelCase(true)}),
    "toCamelCase(true) should throw an error",
    function(result) {
        return result.message === "Write a valid string on input.";
});

test(errorHandling(function() {toCamelCase(123145167)}),
                "toCamelCase(123145167) should throw an error",
                function(result) {
                    return result.message === "Write a valid string on input.";
    });

test(errorHandling(function() {toCamelCase([])}),
                'toCamelCase("") should throw an error',
                function(result) {
                    return result.message === "Write a valid string on input.";
    });

test(errorHandling(function() {toCamelCase({})}),
                'toCamelCase({}) should throw an error',
                function(result) {
                    return result.message === "Write a valid string on input.";
});
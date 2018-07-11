"use strict";

test(function () { return countChars("Hello World");},
            "countChars('Hello World') should return 11",
            function (result) { return result === 11;
    });
    
test(function () { return countChars("123145167", function(n) {return n=== "1";});}, 
            "countChars('123145167', function(n) {return n=== '1';}) should return 3", 
            function(result) {return result === 3;
    });

test(errorHandling(function() {countChars(true)}),
    "countChars(true) should throw an error",
    function(result) {
        return result.message === "Input str is not a string";
});

test(errorHandling(function() {countChars(123145167)}),
                "countChars(123145167) should throw an error",
                function(result) {
                    return result.message === "Input str is not a string";
    });

test(errorHandling(function() {countChars([])}),
                'countChars("") should throw an error',
                function(result) {
                    return result.message === "Input str is not a string";
    });

test(errorHandling(function() {countChars("Hello World", "...")}),
                'countChars("Hello World", "...") should throw an error',
                function(result) {
                    return result.message === "Input handler is not a function";
});
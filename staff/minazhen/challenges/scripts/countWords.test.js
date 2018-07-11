"use strict";

test(function () { return countWords("Hello World");},
            "countWords('Hello World') should return 2",
            function (result) { return result === 2;
    });

test(function () { return countWords("Hello litte World");}, 
            "countWords('Hello litte World') should return 3", 
            function(result) {return result === 3;
    });

test(errorHandling(function() {countWords(true)}),
    "countWords(true) should throw an error",
    function(result) {
        return result.message === "Input str is not a string";
});

test(errorHandling(function() {countWords(123145167)}),
                "countWords(123145167) should throw an error",
                function(result) {
                    return result.message === "Input str is not a string";
    });

test(errorHandling(function() {countWords([])}),
                'countWords("") should throw an error',
                function(result) {
                    return result.message === "Input str is not a string";
    });

test(errorHandling(function() {countWords({})}),
                'countWords({}) should throw an error',
                function(result) {
                    return result.message === "Input str is not a string";
});
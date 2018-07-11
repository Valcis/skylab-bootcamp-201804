"use strict";

test(function () { 
    var randoms = [toRandomCase("Hello World"), toRandomCase("Hello World"), toRandomCase("Hello World")];
    return randoms},
    "toRandomCase('Hello World')x3 should return random upper case and lower case letters",
    function (result) { return result[0] !== result[1] !== result[2];
});

test(function () { 
    var randoms = [toRandomCase("abcdefghijklm"), toRandomCase("abcdefghijklm")];
    return randoms},
    "toRandomCase('abcdefghijklm')x2 should return random upper case and lower case letters",
    function (result) { return result[0] !== result[1];
});

test(function () { 
    var randoms = [toRandomCase("A B"), toRandomCase("A B"), toRandomCase("A B"), toRandomCase("A B")];
    return randoms},
    "toRandomCase('A B')x4 should return random upper case and lower case letters",
    function (result) { return result[0] !== result[1] !== result[2] !== result[3];
});

test(errorHandling(function() {toRandomCase(true)}),
    "toRandomCase(true) should throw an error",
    function(result) {
        return result.message === "Input is not a valid string";
});

test(errorHandling(function() {toRandomCase(123145167)}),
                "toRandomCase(123145167) should throw an error",
                function(result) {
                    return result.message === "Input is not a valid string";
    });

test(errorHandling(function() {toRandomCase([])}),
                'toRandomCase("") should throw an error',
                function(result) {
                    return result.message === "Input is not a valid string";
    });

test(errorHandling(function() {toRandomCase({})}),
                'toRandomCase({}) should throw an error',
                function(result) {
                    return result.message === "Input is not a valid string";
});
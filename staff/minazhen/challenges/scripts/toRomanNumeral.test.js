"use strict";

test(function () { return toRomanNumeral(1234);},
            "toRomanNumeral(1234) should return MCCXXXIV",
            function (result) { return result === "MCCXXXIV";
    });

test(function () { return toRomanNumeral(2.2);}, 
            "toRomanNumeral(2.2) should return II, roman people didn't use decimals.", 
            function(result) {return result === "II, roman people didn't use decimals.";
    });

test(function () { return toRomanNumeral(3999999);}, 
                "toRomanNumeral(3999999) should return M̅M̅M̅C̅M̅X̅C̅I̅X̅CMXCIX", 
                function (result) {return result === "M̅M̅M̅C̅M̅X̅C̅I̅X̅CMXCIX"; 
    });

test(errorHandling(function() {toRomanNumeral(4000000)}),
                "toRomanNumeral(4000000) should throw an error",
                function(result) {
                    return result.message === "Program only recognizes until M\u0305 number.";
    });

test(errorHandling(function() {toRomanNumeral(-2)}),
                'toRomanNumeral("") should throw an error',
                function(result) {
                    return result.message === "Romans didn't use negative numbers.";
    });

test(errorHandling(function() {toRomanNumeral()}),
                'toRomanNumeral([1]) should throw an error',
                function(result) {
                    return result.message === "Input is not a valid number.";
    });

test(errorHandling(function() {toRomanNumeral({})}),
                'toRomanNumeral({}) should throw an error',
                function(result) {
                    return result.message === "Input is not a valid number.";
    });

test(errorHandling(function() {toRomanNumeral(["1"])}),
                'toRomanNumeral([""]) should throw an error',
                function(result) {
                    return result.message === "Input is not a valid number.";
    });
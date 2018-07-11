"use strict";

test(function () { return cube([1, 2, 3]);},
            "cube([1, 2, 3]) should return [1, 8, 27]",
            function (result) { return result.toString() === [1, 8, 27].toString();
    });

test(function () { return cube([1, 2, 3]);}, 
            "cube([1,2,3]) should return [1, 8, 27]", 
            function(result) {return result.toString() === [1, 8, 27].toString();
    });

test(function () { return cube([5+5, 0, 1, -2.2]);}, 
                "cube([5+5, 0, 1, -2.2]) should return [1000, 0, 1, -10.648]", 
                function (result) {return result.toString() === [1000, 0, 1, -10.648].toString(); 
    });

test(errorHandling(function() {cube([1, 2, "a"])}),
                "cube([1, 2, 'a']) should throw an error",
                function(result) {
                    return result.message === "Array can only include numbers, check index 2";
    });

test(errorHandling(function() {cube("")}),
                'cube("") should throw an error',
                function(result) {
                    return result.message === (("") +" is not a valid value.");
    });

test(errorHandling(function() {cube({})}),
                'cube({}) should throw an error',
                function(result) {
                    return result.message === ({}.toString()+ " is not a valid value.");
});

test(errorHandling(function() {cube([""])}),
                'cube([""]) should throw an error',
                function(result) {
                    return result.message === ("Array can only include numbers, check index 0");
});
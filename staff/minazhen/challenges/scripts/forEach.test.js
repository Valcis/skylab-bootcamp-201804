"use strict"

var _a = [1,2,3];
var output = [];

test(function () { return forEach([[1,2], {}], function(v) { 
    output.push(v); });},
    "forEach([[1,2], {}], function(v) { console.log(v); }) should return an undefined result" +
    " and fulfill output with values from input",
    function(result) {
        return [[1,2], {}].toString() === output.toString();
    });
    
output = [];


test(function () { return forEach([{}, "a"], function(v, i) { 
    return output.push([v, i]); });},
    "forEach([{}, 'a'], function(v, i) { console.log(v, i); }) should return an undefined result" +
    " and fulfill output with values from input",
    function (result) { 
        var funcForEach = [];
        [{}, "a"].forEach(function(currentValue, index) {
            funcForEach.push(currentValue, index);
          });
        return output.toString() === funcForEach.toString();
    });
    
output = [];

test(function () { return forEach(_a, function(v, i, arr) { 
    return output.push([v, i, arr]); });},
    "forEach(_a, function(v, i, arr) { console.log(v, i, arr); }) should return an undefined result" +
    " and fulfill output with values from input",
    function (result) { 
        var funcForEach = [];
        _a.forEach(function(currentValue, index, array) {
            funcForEach.push(currentValue, index, array);
          });
        return output.toString() === funcForEach.toString();
    });

test(errorHandling(function() {forEach();}),
    "forEach() without arguments should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {forEach(true, function(v, i, arr) {})}),
    "forEach(true) should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {forEach(12345, function(v, i, arr) {})}),
    "forEach(12345) should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {forEach("12345", function(v, i, arr) {})}),
    "forEach('12345') should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {forEach(_a, "(...)")}),
    "forEach(_a) should throw an error",
    function(result) {
        return result.message === "Input handler is not a function.";
});

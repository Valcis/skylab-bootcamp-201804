"use strict";

var names = ['john', 'mary', 'jack'];
var ini = [1,2,3];
test(
    function() {
        return map(ini, function(v, i, a) {return v**2; });
    },
    "map([1,2,3], function(v) {return v**2; }) -> [1,4,9]",
    function(result) {
        return ini !== result && result.toString() === "1,4,9" && ini.toString() === "1,2,3";
    }
);

test(function () { return map(names, function(v) { return v.toUpperCase(); }); },
            "map(names, function(v) { return v.toUpperCase(); }) should return ['JOHN', 'MARY', 'JACK']",
            function (result) { return result.toString() === names.toString().toUpperCase();
    });

test(function () { return map(names, function(v, i) {return  i +"_"+ v.toUpperCase(); });},
        "map(names, function(v, i) {return  i +'_'+ v.toUpperCase(); })"+
        "should return ['0_JOHN', '1_MARY', '2_JACK']",
        function (result) { 
            return result.toString() === (names.map(function(w,j) {
                return  j +"_"+ w.toUpperCase();})).toString();
});

test(function () { return map(names, function(v, i, a) {return  i + 1 +"_"+ v.toUpperCase() +" from "+ a[i]; });},
        "map(names, function(v, i) {return  i +'_'+ v.toUpperCase()+ 'from' + a[i]; })"+
        "should return ['1_JOHN from john', '2_MARY from mary', '3_JACK from jack']",
        function (result) { 
            return result.toString() === ["1_JOHN from john", "2_MARY from mary", "3_JACK from jack"].toString();
});

test(errorHandling(function() {map();}),
    "map() without arguments should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {map(true, function(v, i, arr) {})}),
    "map(true) should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {map(12345, function(v, i, arr) {})}),
    "map(12345) should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {map("12345", function(v, i, arr) {})}),
    "map('12345') should throw an error",
    function(result) {
        return result.message === "Write a valid array on input.";
});

test(errorHandling(function() {map(names, "(...)")}),
    "map(_a) should throw an error",
    function(result) {
        return result.message === "Input handler is not a function.";
});
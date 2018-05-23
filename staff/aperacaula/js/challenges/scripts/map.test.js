

'use strict';
var input=[1,2,3]; //we have to define this and run the test with it because we need to check in the end that it hasn't been modified, as a client spec
test(
    function (){
        return map(input, function(v){return v**2})
    }, 'map([1,2,3], function(v){return v**2}) should return [1,4,9]',
    function (obtained_in_try){
        return input !== obtained_in_try && obtained_in_try.toString() === '1,4,9';
    }
)

test(
    runWithErrorCapturing(function(){return map()}),
    'map() should throw an error if input array is undefined',
    function (obtained_in_try){
        return obtained_in_try.message === 'first input not array type';
    }
)

test(
    runWithErrorCapturing(function(){return map('this is from Mathilda')}),
    'map(this is from mathilda) should throw an error if input is not array ',
    function (obtained_in_try){
        return obtained_in_try.message === 'first input not array type';
    }
)

test(
    runWithErrorCapturing(function(){return map([])}),
    'map([]) should throw an error if input array is undefined',
    function (obtained_in_try){
        return obtained_in_try.message === 'second input not function type';
    }
)

var input=['a','b','c'];
test(
    function (){
        return map(input, function(v){return v.toUpperCase()})
    }, 'map([a,b,c], function(v){return v.toUpperCase}) should return [A,B,C]',
    function (obtained_in_try){
        return input !== obtained_in_try && obtained_in_try.toString() === 'A,B,C';
    }
)
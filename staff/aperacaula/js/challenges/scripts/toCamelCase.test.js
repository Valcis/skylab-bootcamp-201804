"use strict";

test(function(){
    return toCamelCase('hello my world');
}, 'toCamelCase("hello my world") should return "Hello My World"',
function(obtained_in_try){
    return obtained_in_try==='helloMyWorld'
})

test(runWithErrorCapturing(function(){
    return toCamelCase(56);
}),'toCamelCase(56) should launch an error',
function(obtained_in_try){
    return obtained_in_try.message==='input is not a string';
})
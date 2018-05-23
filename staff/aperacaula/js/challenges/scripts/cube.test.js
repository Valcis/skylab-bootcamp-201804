"use strict";

test(function(){
    return cube(3)
},'cube(3) should return 27',
function(obtained_in_try){
    return obtained_in_try===27
})

test(runWithErrorCapturing(function(){
    return cube('aaa');
}),'cube(aaa) should launch an error',
function(obtained_in_try){
    return (obtained_in_try.message === 'input is wrong type' || obtained_in_try.message === 'input array is not a number at index ');
})

test(function(){
    return cube([1,2,3])
}, 'cube([1,2,3]) should return [1,8,27]',
function(obtained_in_try){
    return obtained_in_try.toString() === [1,8,27].toString();
}
)


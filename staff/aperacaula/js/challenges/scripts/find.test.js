'use strict';

test(
    function(){
        return find(['john','mary','jack'], function(v){return v.indexOf('a')> -1});
    }, "find(['john','mary','jack'], function(v){return v.indexOf('a')> -1}) should return 'mary'",
    function(obtained_in_try){
        return obtained_in_try==='mary';
    }
)

test(
    function(){
        return find(['john','mary','jack'], function(v){return v.indexOf('w')> -1});
    }, "find(['john','mary','jack'], function(v){return v.indexOf('w')> -1}) should return undefined",
    function(obtained_in_try){
        return obtained_in_try===undefined;
    }
)

test(
    runWithErrorCapturing(function(){return find()}),
    'find() should launch an error',
    function(obtained_in_try){
        return obtained_in_try.message==='first input not an array';
    }
)

test(
    runWithErrorCapturing(function(){return find([])}),
    'find() should launch an error',
    function(obtained_in_try){
        return obtained_in_try.message==='second input not a function';
    }
)
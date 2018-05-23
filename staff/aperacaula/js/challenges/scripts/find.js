'use strict';
function find(array, action){
    if (!(array instanceof Array)) throw Error('first input not an array');
    if (typeof action !== 'function') throw Error('second input not a function');
    var arr_new=[];
    for (var i=0; i<array.length; i++){
        if (action(array[i])){
            return (array[i]);
        }
    }
    
    }


    function concat(text){
        var accum=text;
        return {
            concat: function(text2){accum+=' '+text2; return this},
            toString: function(){return text}}}
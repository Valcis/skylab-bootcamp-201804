'use strict';

test(
    function(){
        return countWords('hello world');
    },
    'countWords ("hello world") should return 2',
    function(count){
        return count === 2;
    }
);
test(
    withErrorCapturing(function() {
        countWords(true);
    }),
    'countWords(true) should throw an error',
    function(count){
        return count.message == 'input words is not a string';
    }
);

test(
    withErrorCapturing(function(){
        countWords({})
    }),
    'countWords({}) should throw an error',
    function(count){
        return count.message == 'input words is not a string';
    }
);    

test(
    withErrorCapturing(function(){
        countWords(1)
    }),
    'countWords(1) should throw an error',
    function(count){
        return count.message == 'input words is not a string';
    }
); 

test(
    withErrorCapturing(function(){
        countWords([])
    }),
    'countWords([]) should throw an error',
    function(count){
        return count.message == 'input words is not a string';
    }
);   

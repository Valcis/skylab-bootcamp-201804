'use strict'; 

test ( function(){
  return countWords("Hello World");
}, 'countWords("hello World") should return 2', function(result) {
  return result === 2;
});
  
test (
  withErrorCapturing(function () {
    countWords(true)
  }), 'countWords(true) should throw an error', function(result){
    return result.message === 'input is not a string';
  }
);

test (
  withErrorCapturing(function () {
    countWords(12);}), 'countWords(12) should launch an error', function (result) {
      return result.message === 'input is not a string';
  }
);

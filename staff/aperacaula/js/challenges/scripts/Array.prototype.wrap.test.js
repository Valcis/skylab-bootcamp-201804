'use strict';


test(
  function(){
    return [1,2,3].wrap('-','!')
  }, '[1,2,3].wrap(...) should return ["-1!","-2!","-3!"]',
  function(obtained_in_try){
    return obtained_in_try.toString() === ["-1!","-2!","-3!"].toString();
  }
)

test(
  runWithErrorCapturing(function(){
    return [1,2,3].wrap(2,'!')
  }), '[1,2,3].wrap(...) should launch an error',
  function(obtained_in_try){
    return obtained_in_try.message === 'wrong input type';
  }
)
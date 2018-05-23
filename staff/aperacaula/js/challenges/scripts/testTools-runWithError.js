/**
 * 
 * This function will be used to catch the errors that are expected from a certain function func(), it will return a function that returns an error due to a certain func().
 * 
 * @param {Function} func - it is the function we expect to fail, to error
 * 
 * 
 * @returns {Funtcion} gives a function that when called gives the error of the input function 
 * 
 * 
 * 
 */

 function runWithErrorHandling(func){
     return function(){
         var error;
         try {
             func()
         } catch (err) {
             error=err;
         }
         return error;
     };
 }
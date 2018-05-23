/**
 * Will assist to test functions
 * 
 * It will print through the console a positive message if it gives what it should
 * 
 * It will print 'FAILED' if the testCase gives an error and so the test cannot be performed or gives an error, the test, NOT the function. 
 * 
 * @example 
 * 
 * 
 * @param {Function} testCase - the case that you will test, it can be positive or an error, but it must be a function
 * @param {String} message - the message to display 
 * @param {Function} check - checks if the result is the one it should be, gives true or false, it was the result === expectec-result
 * 
 * 
 * @returns {console.log}- it prints on the screen
 * 
 * 
 */

 function test(testCase, message, check){
    try{
        var res= testCase();
        console.log(message, check(res),res);
    }catch(err){
        console.log(message, 'FAIL', err)

    }
 }
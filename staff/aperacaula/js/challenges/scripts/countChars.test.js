"use strict";
var count= countChars('hello world');
console.log("countChars(count) should return 11 ", count===11, count);

count= countChars('123456789');
console.log("countChars(count) should return 9 ", count===9, count);

var error;
try {
    count=countChars(true);
} catch (err) {
    error=err;
    
}finally{
    console.log("countChars(true) should launch an error ", error !==undefined, error)
}
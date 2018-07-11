'use strict';
var error
var convert= toRandomCase('Hello world')

console.log(convert);

error = undefined;
try {
    convert = toRandomCase(1)
} catch (err) {
    error=err;
}finally{
    console.log('toRandomCase(1) should throw an error',error !== undefined, error);
}
error= undefined;

try {
    convert = toRandomCase([])
} catch (err) {
    error=err;
}finally{
    console.log('toRandomCase([]) should throw an error',error !== undefined, error);
}
error= undefined;

try {
    convert = toRandomCase({})
} catch (err) {
    error=err;
}finally{
    console.log('toRandomCase({}) should throw an error',error !== undefined, error);
}
error= undefined;



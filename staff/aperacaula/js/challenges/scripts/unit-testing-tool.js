function test(testCase, message, check) {
  try {
    var res = testCase();
    check(res)
      ? console.log('TEST', message, 'TRUE', '->',res)
      : console.warn('TEST', message, 'FALSE', '->', res);
    
  } catch (err) {
    console.log('TEST', message, "FAIL", '->', err);
  }
}

function runWithErrorCapturing(func) {
  return function() {
    var error;
    try {
      func();
    } catch (err) {
      error = err;
    }
    return error;
  };
}

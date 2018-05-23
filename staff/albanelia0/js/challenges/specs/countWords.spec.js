'use strict';

describe('countWords', function(){
  it('countWords("hello world") should return 2', function(){
    expect(countWords("hello world")).toBe(2);
  });
  it('countWords() - without arguments - it should be undefined',function(){
    expect(function(){
      countWords()
    }).toBeDefined();
  });
});
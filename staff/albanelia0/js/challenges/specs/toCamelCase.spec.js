'use strict';

describe('toCamelCase', function(){
  it('toCamelCase("hello World") should return helloWorld',function(){
    expect(toCamelCase("hello World")).toBe('helloWorld');
  });
})
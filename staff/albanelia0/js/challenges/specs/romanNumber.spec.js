'use strict';

describe('romanNumber', function(){
  it('romanNumber(2) should return II', function(){
    expect(numberRoman(2)).toEqual('II');
  });
  it('romanNumber([]) - should be undefined',function(){
    expect(function(){
      randomCase([]);
    }).toBeDefined();
  })
});
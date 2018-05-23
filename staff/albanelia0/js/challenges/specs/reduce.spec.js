'use strict';

describe('reduce',function(){
  it('reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }) - with all arguments - should return 15', function(){
    expect(reduce([1, 2, 3, 4, 5], function (accum, v) { return accum + v; })).toBe(15);
  });
  it('reduce() - without any arguments - should throw an error',function(){
    expect(function(){
      reduce();
    }).toThrow(Error('input array is not an array'));
  }); 
  
  it('reduce(undefined, function (accum, v) { return accum + v; }) - without the firt argument - should throw an error',function(){
    expect(function(){
      reduce(undefined, function (accum, v) { return accum + v; });
    }).toBeDefined();
  });

  it('reduce([]) - without second argument - should throw an error',function(){
    expect(function(){
      reduce([]);
    }).toBeDefined();
  });

});
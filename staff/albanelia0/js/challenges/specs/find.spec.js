'use strict';

var input = ['john', 'mary', 'jack'];

describe('find',function(){
  it('find(input, function(v) { return v.indexOf("a") > -1; }); // -> mary',function(){
    expect(find(input, function (v) { return v.indexOf("a") > -1; })).toBe('mary');
  });
  it("find(['john', 'mary', 'jack'], function (v) { return v.indexOf('w') > -1; }) should return undefined",function(){
    expect(input, function (v) { return v.indexOf('w') > -1; }).toBeDefined();
  });
  it('find() should throw error',function(){
    expect(function(){
      find();
    }).toThrow(Error('input array is not valid'));
  });
  it('find([]) should throw error',function(){
    expect(function(){
      find([]);
    }).toThrow(Error('input condition is not valid'));
  })
});
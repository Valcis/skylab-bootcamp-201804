'use strict';

var input = [1,2,3];

describe('Wrap',function(){
  it("input.wrap('[', ']'); should return a new array with values ['[1]', '[2]', '[3]']",function(){
    expect(input.wrap('[', ']')).toEqual(["[1]", "[2]", "[3]"]);
  });

  it("input.wrap('[', ']').wrap('{', '}'); should return a new array with values ['{[1]}', '{[2]}', '{[3]}']",function(){
    expect(input.wrap('[', ']').wrap('{', '}')).toEqual(['{[1]}', '{[2]}', '{[3]}']);
  });

  it("input.wrap('[', ']').wrap('{', '}').wrap('<', '>'); should return a new array with values ['<{[1]}>', '<{[2]}>', '<{[3]}>']",function(){
    expect(input.wrap('[', ']').wrap('{', '}').wrap('<', '>')).toEqual(['<{[1]}>', '<{[2]}>', '<{[3]}>']);
  });

});




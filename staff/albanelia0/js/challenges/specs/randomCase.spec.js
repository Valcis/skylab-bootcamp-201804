'use strict';

describe('randomCase',function(){
  it('randomCase([]) should throw error',function(){
    expect(function(){
      randomCase(['str'])
    }).toThrow(Error('input is not a string'));
  })
})
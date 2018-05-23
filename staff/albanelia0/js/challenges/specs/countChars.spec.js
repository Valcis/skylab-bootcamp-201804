 'use strict';
 
 describe('counChars', function (){
   it('countChars("hello world") should return 11', function(){
     expect(countChars('hello world')).toBe(11);
   });

   it('countChars("0123456789") should return 10', function(){
     expect(countChars("0123456789")).toBe(10);
   });

   it('countChars(true) should throw an error',function(){
    expect(function(){
      countChars(true);
    }).toThrow(Error('input text is not a string'));
   });

   it('countChars(1) should throw an error',function(){
     expect(function(){
       countChars(1)
     }).toThrow(Error('input text is not a string'));
    });

   it('countChars("abracadabra", function(c) { return c === "a"; }) should return 5',function (){
      expect(function(c) {
        countChars("abracadabra");
        return c === 'a';})
   });
 
});
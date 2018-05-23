'use strict';

describe('counting chars', function(){
    it('should return 4 when countChars("abcd")',function(){
        expect(countChars('abcd')).toBe(4)
    })

    it('should return 2 when countChars("abcda", function(v){ return v==="a"})', function(){
        expect(countChars('abcda',function(v){return v==='a'})).toBe(2)
    })

    it('should give an error...',function(){
        expect(function(){countChars(5)}).toThrow(Error('input text is not a string'))
    })

    it('should give an error...',function(){
        expect(function(){countChars('string',78)}).toThrow(Error('input condition is not a function'))
    })

    it('should give an error because of no input',function(){
        expect(function(){countChars()}).toThrow(Error('there are no inputs'))
    })
    
})
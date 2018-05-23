'use strict';

describe('cube',function(){
    it('should return 27 on cube(3)', function(){
        expect(cube(3)).toBe(27)
    });

    it('should return [1,8,27] on cube([1,2,3]', function(){
        expect(cube([1,2,3]).toString()).toBe([1,8,27].toString())
    })

    it('should throw an error...',function(){
        expect(function(){cube(true)}).toThrow(Error('input is wrong type'))
    })

    it('should throw an error...', function(){
        expect(function(){cube([1,2,true])}).toThrow(Error('input array is not a number at index '))
    })
})
'use strict';
var a=[1,2,3];

describe('Array.prototype.wrap', function(){

    it('a.wrap("[" , "]") return ["[1]","[2]","[3]" ]', function(){
        expect( a.wrap('[' , ']')).toBe(['[1]','[2]','[3]']);
    });

    it('should a.wrap() throw error', function(){
        expect(function(){
            a.wrap();
        }).toThrow(Error('input left is not valid'));
    });

    it('should a.wrap() throw error', function(){
        expect(function(){
            a.wrap('');
        }).toThrow(Error('input right is not valid'));
    });
})
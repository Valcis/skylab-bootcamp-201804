'use strict';

describe('toRomanNumeral', function(){

    it('toRomanNumeral(6) should return "VI"', function(){
        expect(toRomanNumeral(6)).toBe('VI');
    });

    it('should toRomanNumeral(true) throw error', function () {
        expect(function () {
            toRomanNumeral(true);
        }).toThrow(Error('input num is not a number'));
    });

    it('should toRomanNumeral("") throw error', function () {
        expect(function () {
            toRomanNumeral("");
        }).toThrow(Error('input num is not a number'));
    }); 

    it('should toRomanNumeral({}) throw error', function () {
        expect(function () {
            toRomanNumeral({});
        }).toThrow(Error('input num is not a number'));
    }); 

    it('should toRomanNumeral([]) throw error', function () {
        expect(function () {
            toRomanNumeral([]);
        }).toThrow(Error('input num is not a number'));
    }); 
})
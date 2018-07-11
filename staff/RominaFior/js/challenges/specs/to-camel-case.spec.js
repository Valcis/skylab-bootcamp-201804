'use strict';

describe('toCamelCase', function(){

    it('toCamelCase("Hello My World") should return "helloMyWorld"', function(){
        expect(toCamelCase("Hello My World")).toBe("helloMyWorld");
    });

    it('toCamelCase(true) should throw an error', function(){
        expect(function () {
            toCamelCase(true);        
        }).toThrow(Error('input str is not a string'));
    });

    it('toCamelCase(1) should throw an error', function(){
        expect(function () {
            toCamelCase(1);
        }).toThrow(Error('input str is not a string'));
    });

    it('toCamelCase([]) should throw an error', function(){
        expect(function (){
            toCamelCase([]);
        }).toThrow(Error('input str is not a string'));
    });

    it('toCamelCase({}) should throw an error', function(){
        expect(function () {
            toCamelCase({});
        }).toThrow(Error('input str is not a string'))
    });
})
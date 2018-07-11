'use strict';

var input = 'Hello World';

var output = toRandomCase(input);

describe('toRandomCase',function(){
    it('toRandomCase(input) should return input in random case', function(){
        expect(toRandomCase(input)).toBe(input.toLowerCase() === output.toLowerCase() && input !== output, output)
    });

    it('toRandomCase(1) should throw an error', function(){
        expect(function(){
            toRandomCase(1);
        }).toThrow(Error('input str is not a string'));
    });

    it('toRandomCase([]) should throw an error', function(){
        expect(function(){
            toRandomCase([]);
        }).toThrow(Error('input str is not a string'));
    });

    it('toRandomCase({}) should throw an error', function(){
        expect(function(){
            toRandomCase({});
        }).toThrow(Error('input str is not a string'));
    });

    it('toRandomCase(true) should throw an error', function(){
        expect(function(){
            toRandomCase(true);
        }).toThrow(Error('input str is not a string'));
    });
})
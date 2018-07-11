'use strict';

describe('countChars', function () {
    it('countChars("hello world") should return 11', function () {
        expect(countChars('hello world')).toBe(11);
    });

    it('should countChars("0123456789") return 10', function () {
        
        expect(countChars("0123456789")).toBe(10);
    });

    it('should countChars(true) throw error', function () {
        expect(function () {
            countChars(true);
        }).toThrow(Error('input text is not a string'));
    });

    it('should countChars([]) throw error', function() {
        expect(function () {
            countChars([]);
        }).toThrow(Error('input text is not a string'));
    });

    it('countChars("abracadabra", function(c) { return c === "a"; }) should return 5', function () {
        expect(countChars('abracadabra', function(c) { return c === 'a'; })).toBe(5);
    });
    
    it('countChars("abracadabra", "...") should throw an error', function() {
        expect(function () {
            countChars('abracadabra', '...');
        }).toThrow(Error('input condition is not a function'));
    });
});